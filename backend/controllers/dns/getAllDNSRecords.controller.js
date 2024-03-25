
// ---------------GET all dns record
export const getAllDNSRecords = async (req, res,client,ListResourceRecordSetsCommand,HostedZoneId) => {
    try {
        const params = {
            HostedZoneId
        };

        const command = new ListResourceRecordSetsCommand(params);
        const data = await client.send(command);

        res.status(200).json(data);
    } catch (error) {
        console.error('Error retrieving DNS records:', error);
        res.status(500).json({ error: 'Error retrieving DNS records' });
    }
};
