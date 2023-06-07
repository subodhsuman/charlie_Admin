import * as XLSX from 'xlsx/xlsx.mjs';
import jsPDF from "jspdf";
import _ from "lodash";
import 'jspdf-autotable';
import Date from './Date.js';

export const generateExcel = (data, filename="data") => {
    var wb = XLSX.utils.book_new(),
        ws = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(wb, ws, "SHEET1");
    XLSX.writeFile(wb, `${filename}.xlsx`)
    return;
}


export const generatePDF = (heading, array_data = [], filename = "Export", relational_keys = { "heading": [], "data": [] }) => {
    if (array_data == undefined || array_data.length == 0) {
        return "invalid data!";
    }
    filename = filename + ' - ' + new window.Date().toLocaleDateString();
    // Date.getDate(Date.now());

    const pdf = new jsPDF("p", "pt", "a4");

    let first_row = _.pick(array_data[0], heading);
    let columns = Object.keys(first_row);

    columns = _.concat(columns, relational_keys.heading);

    //  return "invalid data!";
    var rows = [];
    console.log("here");

    for (let i = 0; i < array_data?.length; i++) {
        let temp = _.pick(array_data[i], columns);

        if (temp.hasOwnProperty("created_at")) {
            temp.created_at = Date.getDate(temp.created_at);
        }
        if (temp.hasOwnProperty("createdAt")) {
            temp.createdAt = Date.getDate(temp.createdAt);
        }
        if (temp.hasOwnProperty("user_verify")) {
            temp.user_verify = temp.user_verify ? 'Verified' : 'UnVerified';
        }
        if (temp.hasOwnProperty("expiry_date")) {
            temp.expiry_date = Date.getDate(temp.expiry_date);
        }

        if (relational_keys.data.length > 0) {
            _.map(relational_keys.data, (v, n) => {
                _.map(v.keys, (v2, i2) => {
                    temp[v2] = (v.parent != "") ? array_data[i][v.parent][v.object][v2] : array_data[i][v.object][v2];

                });
            });
        }

        temp = Object.values(temp);

        rows.push(temp);
    }
    const uppercase = columns.map(element => {
        return (element.toUpperCase()).replace(/_/g, ' ');
    });
    pdf.text(235, 40, filename);
    pdf.autoTable(uppercase, rows, {
        startY: 65,
        theme: "grid",
        styles: {
            font: "times",
            halign: "center",
            cellPadding: 3.5,
            lineWidth: 0.5,
            lineColor: [0, 0, 0],
            textColor: [0, 0, 0]
        },
        headStyles: {
            textColor: [0, 0, 0],
            fontStyle: "normal",
            lineWidth: 0.5,
            lineColor: [0, 0, 0],
            fillColor: [166, 204, 247]
        },
        alternateRowStyles: {
            fillColor: [212, 212, 212],
            textColor: [0, 0, 0],
            lineWidth: 0.5,
            lineColor: [0, 0, 0]
        },
        rowStyles: {
            lineWidth: 0.5,
            lineColor: [0, 0, 0]
        },
        tableLineColor: [0, 0, 0]
    });
    pdf.save(filename);
}