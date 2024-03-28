import csvtojson from 'csvtojson';

export const csvToJson =async(csvData)=> {
    try {
        const jsonData = await csvtojson().fromString(csvData);
        return jsonData;
    } catch (error) {
        console.error('Error converting CSV to JSON:', error);
        throw error;
    }
}

