import React,{useState,useEffect} from 'react';
import Select from 'react-select';
import CurrencyData from "../../assets/json/currency.json"
import ApiClass from '../../Api/api';
import SwalClass from '../../common/swal';
import { useFormik } from "formik";
import * as Yup from 'yup';



const AddListCoin = ({getCrypto, contDetail}) => {

//states
  const [PairOptions, setPairOptions] = useState([]);
  const [selectedPair, setSelectedPair] = useState([]);
  const [NetworkOptions, setNetworkOptions] = useState([]);
  const [selectedNetwork, setSelectedNetwork] = useState([]);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState('')


//Block network get
const getBlockNetwork = async() => {
    let response = await ApiClass.getRequest(`list-coins/block-network`,true);

    if(response?.data?.status_code == 0){
        return
    }
    if(response?.data?.status_code == 1){
        let block_options = [];

    response?.data?.data.map((v,i) => {
        block_options.push({
          label:v?.currency_symbol,
          value:v?.currency_symbol,
          token_type:v?.block_network_type?.token_type,
          id:v?.id
      })
  })
      setNetworkOptions(block_options);
    }
}

  // 
  useEffect(()=>{
    let o = [];
    CurrencyData.map((v,i) => {
      o.push({
          label:v.currency,
          value:v.value,
          price:'0.01'
      })
  })
        setPairOptions(o);
        getBlockNetwork();
  },[])

//formik validation
  const formik = useFormik({
      initialValues: {
          name: '',
          currency: '',
          pair_with: '',
          file: '',
          decimal_currency: '',
          decimal_pair: '',
          token: '',
          buy_desc: '',
          sell_desc: '',
          price_0:'',
          price_1:'',
          price_2:'',
          address_0:'',
          address_1:'',
          address_2:'',
          token_type_0:'',
          token_type_1:'',
          token_type_2:''
      },
      validationSchema: Yup.object({
          name: Yup.string().required("Name is required.").min(3, 'Must be at least 3 Characters.'),
          currency: Yup.string().required("Symbol is required.").min(2, 'Must be at least 2 Characters.'),
          pair_with: Yup.array().required('Pair is required.'),
          file: Yup.string().required('Image is required.'),
          decimal_currency: Yup.string().required('Currency Length Limit is required.'),
          decimal_pair: Yup.string().required('Pair Length is required.'),
          buy_desc: Yup.string().required('Buy Description is required.'),
          sell_desc: Yup.string().required('Sell Description is required.'),
          price_0: Yup.string().when("pair_with", {
                is: (value) => value?.length>0,
                then: Yup.string()
                    .required("Start Price Required")
            }),
            price_1: Yup.string().when("pair_with", {
                is: (value) => value?.length>1,
                then: Yup.string()
                    .required("Start Price Required")
            }),
            price_2: Yup.string().when("pair_with", {
                is: (value) => value?.length>2,
                then: Yup.string()
                    .required("Start Price Required")
            }),
            address_0: Yup.string().when("token", {
                is: (value) => value?.length>0,
                then: Yup.string()
                .required('Smart Contract Address is required.').min(20, 'Must be at least 20 Characters.')
            }),
            address_1: Yup.string().when("token", {
                is: (value) => value?.length>1,
                then: Yup.string()
                .required('Smart Contract Address is required.').min(20, 'Must be at least 20 Characters.')
            }),
            address_2: Yup.string().when("token", {
                is: (value) => value?.length>2,
                then: Yup.string()
                .required('Smart Contract Address is required.').min(20, 'Must be at least 20 Characters.')
            }),
            token_type_0: Yup.string().when("token", {
                is: (value) => value?.length>0,
                then: Yup.string()
                    .required('Block currency type is required.')
            }),
            token_type_1: Yup.string().when("token", {
                is: (value) => value?.length>1,
                then: Yup.string()
                    .required('Block currency type is required.')
            }),
            token_type_2: Yup.string().when("token", {
                is: (value) => value?.length>2,
                then: Yup.string()
                    .required('Block currency type is required.')
            }),
        
      }),
      onSubmit: async (values) => {
        setLoading(true);
        let data = new FormData();
        data.append("name",values.name);
        data.append("currency",values.currency);
       
        values.pair_with.map((v,i)=>{
            data.append(`pair_with[${i}][currency]`, v.value)
            data.append(`pair_with[${i}][price]`, values[`price_${i}`])
        })
         
        data.append("file",image);
        data.append("decimal_currency",values.decimal_currency);
        data.append("decimal_pair",values.decimal_pair);

        values.token.map((v,i)=>{
            data.append(`token[${i}][address]`, values[`address_${i}`])
            data.append(`token[${i}][token_type]`, v.token_type)
            data.append(`token[${i}][network_id]`, v.id)
        })


        data.append("buy_desc",values.buy_desc);
        data.append("sell_desc",values.sell_desc);

          let response = await ApiClass.postRequest(`list-coins/create`, true, data);
          setLoading(false);
          if (!response?.data.hasOwnProperty("status_code")) {
            SwalClass.failed("Unable to Create at this time.")
            return
            }

            if (response?.data?.status_code == 0) {
                setLoading(false);
                SwalClass.failed(response?.data?.message || '')
                return
            }
            if (response?.data?.status_code == 1) {
                setLoading(false);
                SwalClass.success(response?.data?.message || '');
                resetForm()
                getCrypto()
                CustomHandleChange()
                document.getElementById('listformClose').click();
                return
            }
      }
  })
  const { values, handleSubmit, handleChange, errors, touched, resetForm ,setFieldValue} = formik;

useEffect(()=>{
    // console.log(selectedPair.length,"SOMETHING");
    // console.log({formik:values.pair_with});
    selectedPair.length == 0 ?   setFieldValue('pair_with', '')  : setFieldValue('pair_with', selectedPair)
    selectedPair.length == 0 ?  '' : selectedPair.map((v,i)=>{
        setFieldValue(`price_${i}`, v.price)
    });
},[selectedPair]);

useEffect(()=>{
    selectedNetwork.length == 0 ?   setFieldValue('token', '')  : setFieldValue('token', selectedNetwork)
},[selectedNetwork]);

const CustomHandleChange = (e) => {
    setSelectedPair([]);
    setSelectedNetwork([]);
    document.getElementById('image-field-coin').value = '';
}




    //state
    

    const ContractAddress = async (data,index) => {
        console.log(data)
        if (formik.values[`token_type_${index}`] != "" && formik.values[`address_${index}`] != "") {

            var result = await ApiClass.postRequest("wallet/getCdetail", true, {
              token_type: formik.values[`token_type_${index}`],
              contract_address:  formik.values[`address_${index}`],
            });
            if (result.data.status_code == 0) {
                contDetail({message:result?.data?.message});    
                return
            } 
            if (result.data.status_code == 1) {
                contDetail({v:result?.data?.data?.data});    
                return
            } 
          
        }else {
            contDetail({message:"Token Type and Address field not found."})
          }
    }





  return (
    <div className="modal fade common-modal" id="listcoinmodal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div className="modal-dialog modal-xl modal-dialog-centered">
        <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title text-uppercase d-flex align-items-center" id="exampleModalLabel">
                    <svg xmlns="http://www.w3.org/2000/svg" height="30" width="30" viewBox="0 0 48 48" fill="var(--blue)"><path d="M36.5 28v-6.5H30v-3h6.5V12h3v6.5H46v3h-6.5V28ZM18 23.95q-3.3 0-5.4-2.1-2.1-2.1-2.1-5.4 0-3.3 2.1-5.4 2.1-2.1 5.4-2.1 3.3 0 5.4 2.1 2.1 2.1 2.1 5.4 0 3.3-2.1 5.4-2.1 2.1-5.4 2.1ZM2 40v-4.7q0-1.75.875-3.175Q3.75 30.7 5.4 30q3.75-1.65 6.675-2.325Q15 27 18 27t5.9.675q2.9.675 6.65 2.325 1.65.75 2.55 2.15.9 1.4.9 3.15V40Zm3-3h26v-1.7q0-.8-.45-1.525-.45-.725-1.2-1.075-3.55-1.65-6-2.175Q20.9 30 18 30q-2.9 0-5.375.525T6.6 32.7q-.75.35-1.175 1.075Q5 34.5 5 35.3Zm13-16.05q1.95 0 3.225-1.275Q22.5 18.4 22.5 16.45q0-1.95-1.275-3.225Q19.95 11.95 18 11.95q-1.95 0-3.225 1.275Q13.5 14.5 13.5 16.45q0 1.95 1.275 3.225Q16.05 20.95 18 20.95Zm0-4.5ZM18 37Z" /></svg>&nbsp;
                    Add Coin </h5>
                <button type="button" className="btn p-0 border-0" data-bs-dismiss="modal" aria-label="Close" id="listformClose" onClick={(e)=>{resetForm(),CustomHandleChange(e)}}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 48 48" fill="var(--white)"><path d="m16.5 33.6 7.5-7.5 7.5 7.5 2.1-2.1-7.5-7.5 7.5-7.5-2.1-2.1-7.5 7.5-7.5-7.5-2.1 2.1 7.5 7.5-7.5 7.5ZM24 44q-4.1 0-7.75-1.575-3.65-1.575-6.375-4.3-2.725-2.725-4.3-6.375Q4 28.1 4 24q0-4.15 1.575-7.8 1.575-3.65 4.3-6.35 2.725-2.7 6.375-4.275Q19.9 4 24 4q4.15 0 7.8 1.575 3.65 1.575 6.35 4.275 2.7 2.7 4.275 6.35Q44 19.85 44 24q0 4.1-1.575 7.75-1.575 3.65-4.275 6.375t-6.35 4.3Q28.15 44 24 44Zm0-3q7.1 0 12.05-4.975Q41 31.05 41 24q0-7.1-4.95-12.05Q31.1 7 24 7q-7.05 0-12.025 4.95Q7 16.9 7 24q0 7.05 4.975 12.025Q16.95 41 24 41Zm0-17Z" /></svg>
                </button>
            </div>
            <div className="modal-body admin-form">
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label htmlFor="staticName" className="col-form-label">Name</label>
                                <input className="form-control" type="text" placeholder="Name" name="name"  value={values.name} onChange={handleChange} />
                                {errors.name && touched.name && (<span className="text-danger form_err">{errors.name}</span>)}
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label htmlFor="" className="col-form-label">Symbol</label>
                                <input className="form-control" type="text" placeholder="Symbol" name="currency"   value={values.currency} onChange={handleChange} />
                                {errors.currency && touched.currency && (<span className="text-danger form_err">{errors.currency}</span>)}
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="mb-3">
                                <label htmlFor="staticPassword" className="col-form-label">Select Pair</label>
                                <Select
                                    name='pair_with'
                                    options={PairOptions}
                                    value={selectedPair}
                                    onChange={setSelectedPair}
                                    labelledBy="Select Options"
                                    isMulti
                                />
                            {errors.pair_with && touched.pair_with && (<span className="text-danger form_err">{errors.pair_with}</span>)}
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label htmlFor="staticConfirmPassword" className="col-form-label">Choose Image Note :-<span style={{color:"red",fontSize:"14px"}}> 1. Only PNG Image. 2.Image Dimension 84x84 .</span></label>
                             
                                <div className="input-group">
                                <input id="image-field-coin" className="form-control" type="file"  name="file" onChange={handleChange} accept="image/*"
                                onInput={(e)=>setImage(e.target.files[0])} />
                                
                                </div>
                                {errors.file && touched.file && (<span className="text-danger form_err">{errors.file}</span>)}
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label htmlFor="staticReferral" className="col-form-label">Currency Length</label>
                                <input className="form-control" type="text" placeholder="currency length" name="decimal_currency"  value={values.decimal_currency} onChange={handleChange} 
                                onKeyPress={(event) => {
                                    const regExp = /[^0-9\.]/g;
                                    if (regExp.test(event.key)) {
                                        event.preventDefault();
                                    }
                                }}

                                />
                                {errors.decimal_currency && touched.decimal_currency && (<span className="text-danger form_err">{errors.decimal_currency}</span>)}
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label htmlFor="staticReferral" className="col-form-label">Pair Length</label>
                                 <input className="form-control" type="text" placeholder="Decimal Length" name="decimal_pair"  value={values.decimal_pair} onChange={handleChange} 
                                 onKeyPress={(event) => {
                                    const regExp = /[^0-9\.]/g;
                                    if (regExp.test(event.key)) {
                                        event.preventDefault();
                                    }
                                }}

                                 />
                                 {errors.decimal_pair && touched.decimal_pair && (<span className="text-danger form_err">{errors.decimal_pair}</span>)}
                            </div>
                        </div>
<hr />
                      <h5 className='text-center'>Smart Contract Detail</h5>
                        <div className="col-md-6">
                            <div className="mb-3">
                                <label htmlFor="staticReferral" className="col-form-label">Select BlockChain Network</label>
                                <Select
                                    name='token'
                                    options={NetworkOptions}
                                    value={selectedNetwork}
                                    onChange={setSelectedNetwork}
                                    labelledBy="Select Options"
                                    isMulti
                                    style={{color:'#333'}}
                                />
                            </div>
                        </div>
                        <div className="col-md-6">

                        </div>
                        {
                            selectedNetwork.length > 0 ?
                            <>
                            {selectedNetwork.map((v,i)=>{
                            return(
                            <div className='row' key={i}>
                            <div className="col-md-6">
                                <div className="mb-3">
                                    <label htmlFor="staticReferral" className="col-form-label">Contract Address <span style={{color:"red",fontWeight:"bold"}}>*{v.value} </span></label>
                                    <input className="form-control" type="text" placeholder="Smart Contract Address" name={`address_${i}`}  value={values[`address_${i}`]} onChange={handleChange}  />
                                    {errors[`address_${i}`] && touched[`address_${i}`] && (<span className="text-danger form_err">{errors[`address_${i}`]}</span>)}
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="mb-3">
                                    <label htmlFor="staticPassword" className="col-form-label">Token Type</label>
                            
                                    <select className="form-select" aria-label=".form-select-lg" name={`token_type_${i}`}  value={values[`token_type_${i}`]} onChange={handleChange}>
                                        <option value="">Select Option</option>
                                             <option value={v?.token_type}>{v?.token_type}</option>
                                    </select>
                                    {errors[`token_type_${i}`] && touched[`token_type_${i}`] && (<span className="text-danger form_err">{errors[`token_type_${i}`]}</span>)}
                                </div>
                            </div>
                            <div className="col-md-3">
                                <div className="mb-3">
                                <label className="col-form-label">Fetch Token Detail</label>
                                    <div className="export-btn">
                                        <button className='btn w-100' type='button' data-bs-toggle="modal" data-bs-target="#listCoinInfoModal" onClick={()=>ContractAddress(v,i)}>Get Info</button>
                                    </div>
                                </div>
                            </div>
                            </div>  )
                         })} </> : ""
                        }

                        <div className="col-md-6">
                            <div className="mb-3">
                            <label htmlFor="staticPassword" className="col-form-label">Buy description</label>
                               <textarea className='form-control' id="" rows="3" name="buy_desc"  value={values.buy_desc} onChange={handleChange}></textarea>
                               {errors.buy_desc && touched.buy_desc && (<span className="text-danger form_err">{errors.buy_desc}</span>)}
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="mb-3">
                            <label htmlFor="staticPassword" className="col-form-label">Sell description</label>
                                <textarea name="sell_desc" className='form-control' id="" rows="3"  value={values.sell_desc} onChange={handleChange}></textarea>
                                {errors.sell_desc && touched.sell_desc && (<span className="text-danger form_err">{errors.sell_desc}</span>)}
                            </div>
                        </div>
                        {selectedPair.length > 0 ? 
                        <>
                         {selectedPair.map((v,i)=>{
                            return(
                             <div className="col-md-6" key={i}>
                                <div className="mb-3">
                                    <label htmlFor="staticReferral" className="col-form-label">Starting Price:- <span style={{color:"red",fontSize:"15px"}}>Price In {v?.value}</span></label>
                                    <input className="form-control" type="text" placeholder="Start Price" name={`price_${i}`} id={`price_${i}`}  value={values[`price_${i}`]} onChange={handleChange} 
                                    onKeyPress={(event) => {
                                        const regExp = /[^0-9\.]/g;
                                        if (regExp.test(event.key)) {
                                            event.preventDefault();
                                        }
                                    }}

                                    />
                                    {errors[`price_${i}`] && touched[`price_${i}`] && (<span className="text-danger form_err">{errors[`price_${i}`]}</span>)}
                                </div>
                            </div>
                            )
                         })}</> : "" }



                        <div className="col-md-12">
                            <div className="export-btn text-center">
                            {loading ?
                                    <button className="btn" type="button" disabled>
                                        <div className="d-flex align-items-center gap-2">
                                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                            Loading...
                                        </div>
                                    </button>
                                    :
                                    <input type="submit" className="btn" value="Submit" />}
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
    
</div>
  )
}

export default AddListCoin
