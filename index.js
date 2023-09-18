const express = require('express');
const mongoose = require('mongoose');
const climateData = require('./models/climateData');
const dbConnect = require('./dbConnect');

// mongoose.connect('mongodb://localhost/climate', {
//     useNewUrlParser : true,
//     useUnifiedTopology: true,
// })

dbConnect()

const app = express()

const Record = mongoose.model('Record', {
    climate: String,
    area_code: Number,
    temperature: Number,
    humidity: Number,
    chances_of_rain: Number,
})

app.use(express.json())



const port = process.env.PORT || 3000

app.get("/", (req,res) => {
    res.send("Welcome to Climate Change API")
})

app.post('/api/climate-data', async (req, res) => {
    try{
        const data = new climateData(req.body);
        await data.save()
        res.json({success: true, data: { id: data._id}})
    } catch(error){
        res.json({success: false, error: error.message})
    }
})

// Fetch all saved climate records 
app.get('/api/climate-data', async(req, res) => {
    try {
        const allClimateData = await climateData.find()
        res.json({success: true, data: allClimateData})
    } catch (error) {
        res.json({success: false, error: error.message})
    }
})

// Fetch records of a particular area
app.get('/api/climate-data/:areaCode', async(req, res) => {
    const areaCode = req.params.areaCode
    try {
        const data = await climateData.find({ areaCode })
        if(data.length === 0){
            return res.json({success: false, error: 'No data found for the given area code.'})
        }
        res.json({success: true, data: data})
    } catch (error) {
        res.json({success: false, error: error.message})
    }
})

// Fetch records of a particular climate for a given area
app.get('/api/climate-data/:areaCode/:climate', async(req, res) => {
    const { areaCode, climate } = req.params

    // Valid climate type
    if(!['hot', 'humid', 'rainy', 'cold'].includes(climate)){
        return res.status(400).json({success: false, error: 'Invalid climate type. '})
    }

    //Validate area code
    const areaCodeNumber = parseInt(areaCode)
 
    if(isNaN(areaCodeNumber) || areaCodeNumber < 100 || areaCodeNumber > 1000) {
        return res.status(400).json({success: false, error: 'Invalid Area Code. '})
    }

    try {
        const data = await climateData.find({ climate: climate, areaCode: areaCode })
        if(data.length === 0){
            return res.json({ success: false, error: 'No data found for the given area code and climate.' });
        }
        return res.json({success: true, data: data})
    } catch (error) {
        return res.status(500).json({success: false, error: 'Server error. '})
    }
})

// Endpoint for calculating climate change deltas and index
app.post('/api/climate-deltas', async(req, res) => {
    const {from_climate, to_climate, area_code} = req.body

    // Validate climate types
    if (!['hot', 'humid', 'rainy', 'cold'].includes(from_climate) || !['hot', 'humid', 'rainy', 'cold'].includes(to_climate)) {
        return res.status(400).json({ success: false, error: 'Invalid climate type(s).' });
    }

    // Validate area code
    const areaCodeNumber = parseInt(area_code);
    if (isNaN(areaCodeNumber) || areaCodeNumber < 100 || areaCodeNumber > 1000) {
        return res.status(400).json({ success: false, error: 'Invalid area code.' });
    }

    try {
        
        const fromRecords = await climateData.find({climate: from_climate, areaCode: areaCodeNumber})
        const toRecords = await climateData.find({climate: to_climate, areaCode: areaCodeNumber})

        if (fromRecords.length === 0 || toRecords.length === 0) {
            return res.status(404).json({ success: false, error: 'No records found for the specified climate and area.' });
        }

        const tempDelta = calculateAverageDelta(fromRecords, toRecords, 'temperature')
        const humidityDelta = calculateAverageDelta(fromRecords, toRecords, 'humidity')
        const rainChanceDelta = calculateAverageDelta(fromRecords, toRecords, 'chances_of_rain')

        // Calculate climate change index
        const climateChangeIndex = (tempDelta * humidityDelta) / rainChanceDelta;

        return res.json({
            success: true,
            climate_delta : `${from_climate} -> ${to_climate}`,
            temperature_delta: tempDelta,
            humidity_delta: humidityDelta,
            rain_chances_delta: rainChanceDelta,
            climate_change_index: climateChangeIndex
        })

    } catch (error) {
        return res.status(500).json({ success: false, error: 'Server error.' });
    }
})

// Function to calculate average delta
function calculateAverageDelta(fromRecords, toRecords, field) {
    const fromSum = fromRecords.reduce((sum, record) => sum + record[field], 0);
    const toSum = toRecords.reduce((sum, record) => sum + record[field], 0);
    const delta = (toSum - fromSum) / (fromRecords.length || 1); // Avoid division by zero
    return delta;
}

 



app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`)
})
