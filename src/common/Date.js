
export default {
    getDate(date){ 
        let d = Date.parse(date)
        d = new Date(d)
        d = d.getMonth()+1+"-"+ d.getUTCDate()+"-"+ d.getUTCFullYear() ;
        return d;
    },
    now(){
        let d = new Date();
        return d.toLocaleDateString('en-US');
    },
    getTime(v){
        let d = Date(v);
        // d = d.toUTCString()
        // d = d.getMonth()+1+"-"+ d.getUTCDate()+"-"+ d.getUTCFullYear() ; 
        return d;
    }
}