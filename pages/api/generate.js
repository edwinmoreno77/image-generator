import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
    organization: 'org-5Wb501W7SrKXJpNEvD8Yfar4',
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {

    try {
        const response = await openai.createImage({
            prompt: req.body.img,
            n: 1,
            size: '1024x1024',
        });

        res.status(200).json({ image_url: response.data.data[0].url });

    } catch (error) {
        if (error.response) {
            console.log(error.response.status);
            console.log(error.response.data);
        } else {
            console.log(error.message);
        }
    }
}