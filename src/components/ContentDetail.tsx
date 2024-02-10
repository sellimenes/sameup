import axios from 'axios';
import { useEffect, useState } from 'react'

type Props = {}

const ContentDetail = (props: Props) => {
    const [data, setData] = useState<any>(null)
    useEffect(() => {
        const getData = async () => {
            const response = await axios.get('/data.json');
            setData(response.data);
            console.log(response.data);
        }

        getData();
    }, []);
    return (
        <section className='border rounded-md w-full max-w-[555px] max-h-max my-6 mx-auto'>
            <div className='p-6'>
                <h1 className='text-2xl font-semibold'>Content Detail</h1>
                <p className='mt-4 text-gray-600'>This is the content detail component.</p>
            </div>
        </section>
    )
}

export default ContentDetail