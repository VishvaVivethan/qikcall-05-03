const cron = require('node-cron');
const mongoose = require('mongoose');
const Advertise = require ('./schema/advertise').AdvertiseSchema;
const AdvertisePost = mongoose.model("advertise",Advertise)

function startCronJobs() {
    cron.schedule('35 19 * * *', async () => {
        const currentDate = new Date();
        try {
            const result = await AdvertisePost.deleteMany({
                isapprove: true,
                enddate: { $lt: currentDate }
            });
            console.log(`${result.deletedCount} expired advertisements deleted.`);
        } catch (error) {
            console.error('Error deleting expired advertisements:', error);
        }
    });
}

module.exports = { startCronJobs };
