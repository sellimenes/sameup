import axios from 'axios';
import { useEffect, useState } from 'react'
import { t } from 'i18next';

import { useFormatDistance } from '@/lib/useFormatDifference';
import CustomSvg from './CustomSvg';
import { Button } from './ui/button';
import { Plus } from 'lucide-react';

type ContentDetailType = {
    imageUrl: string;
    publisherName: string;
    publisherProfileUrl: string;
    followers: number;
    following: boolean;
    content: {
        title: string;
        tags: string[];
        imageUrl: string;
        publishDate: string;
        alt: string,
        reactions: {
            like: number;
            heart: number;
            clap: number;
            comment: number;
        };
    };
};

const ContentDetail = () => {
    const formatDistance = useFormatDistance();
    const [data, setData] = useState<ContentDetailType>()
    useEffect(() => {
        const getData = async () => {
            const response = await axios.get('/data.json');
            setData(response.data);
            console.log(response.data);
        }

        getData();
    }, []);

    return (
        <section className='border rounded-xl max-w-[620px] w-full max-h-max my-6 mx-auto p-5 bg-white'>
            <div className='flex items-start justify-between'>
                <div className='flex items-center gap-3'>
                    <img src={data?.imageUrl} alt={data?.publisherName} className='w-12 h-12 rounded-full' loading='lazy' />
                    <div>
                        <a href={data?.publisherProfileUrl} className='font-bold'>{data?.publisherName}</a>
                        <div className='flex items-center gap-1'>
                            <p className='opacity-60 text-sm'>{data?.followers} {t('followers')} • </p>
                            <CustomSvg name='world'  />
                        </div>
                        <p className='opacity-60 text-sm'>{data?.content.publishDate && `${formatDistance(new Date(data.content.publishDate), new Date())}`}</p>
                    </div>
                </div>
                <Button variant={'ghost'}>
                    <Plus className="mr-1 h-4 w-4" /> 
                    {t('follow')}
                </Button>
            </div>
            <p>{data?.content.title}</p>
            <p className='font-light'>
                {data?.content.tags.map((tag, index) => (
                    <span key={index}>#{tag} </span>
                ))}
            </p>
            <img src={data?.content.imageUrl} alt={data?.content.alt ? data?.content.alt : t('noAltForThisImage')} />
            <div>
                <CustomSvg name='like' />
            </div>
        </section>
    )
}

export default ContentDetail