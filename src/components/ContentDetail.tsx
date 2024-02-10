import axios from 'axios';
import { useEffect, useState } from 'react'
import { t } from 'i18next';

import { useFormatDistance } from '@/lib/useFormatDifference';
import CustomSvg from './CustomSvg';
import { Button } from './ui/button';
import { Plus } from 'lucide-react';

type ReactorType = {
    imageUrl: string;
    profileUrl: string;
    reactionType: string;
};

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
        alt: string;
        reactions: {
            like: number;
            heart: number;
            clap: number;
            comment: number;
        };
        reactors: ReactorType[];
    };
};

const ContentDetail = () => {
    const formatDistance = useFormatDistance();
    const [data, setData] = useState<ContentDetailType>()
    useEffect(() => {
        const getData = async () => {
            const response = await axios.get('/data.json');
            setData(response.data);
        }

        getData();
    }, []);

    useEffect(() => {
        console.log(data)
    });

    return (
        <section className='border rounded-xl max-w-[620px] w-full max-h-max my-6 mx-auto p-5 bg-white'>
            {/* Content Detail Header Start */}
            <div className='flex items-start justify-between'>
                <div className='flex items-center gap-3'>
                    <img src={data?.imageUrl} alt={data?.publisherName} className='w-12 h-12 rounded-full' loading='lazy' />
                    <div>
                        <a href={data?.publisherProfileUrl} className='font-bold'>{data?.publisherName}</a>
                        <p className='opacity-60 text-sm'>{data?.followers} {t('followers')}</p>
                        <div className='flex items-center gap-1'>
                            <p className='opacity-60 text-sm'>{data?.content.publishDate && `${formatDistance(new Date(data.content.publishDate), new Date())}`} • </p>
                            <CustomSvg name='world' className='opacity-60' />
                        </div>
                    </div>
                </div>
                <Button variant={'ghost'} className='text-lg text-[#0a66c2] hover:text-[#0a66c2] hover:bg[rgba(112,181,249,0.2)]'>
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
            {/* Content Detail Header End */}

            {/* Content Image Start */}
            <img src={data?.content.imageUrl} alt={data?.content.alt ? data?.content.alt : t('noAltForThisImage')} />
            {/* Content Image End */}

            {/* Reaction Icons Start */}
            <div className='w-full border-b pb-2 flex items-center gap-1'>
                <CustomSvg name='like' size='18' />
                {/* TODO: Like sayısı gözükmüyor. */}
                <span className='opacity-60 text-sm'>{data?.content?.reactions?.like ? 0 : 8}</span>
            </div>
            {/* Reaction Icons End */}

            {/* Reactors Start */}
            <div>
                <p className='mt-4 mb-2 text-lg font-light'>{t('reactions')}</p>
                <div className='flex items-center gap-2'>
                    {data?.content.reactors.map((reactor, index) => (
                        <div key={index} className='relative'>
                            <a href={reactor.profileUrl}>
                                <img src={reactor.imageUrl} className='w-12 h-12 rounded-full overflow-hidden' loading='lazy' />
                                {reactor.reactionType === 'like' && (
                                    <CustomSvg name='like' size='18' className='absolute bottom-0 right-0 border-white rounded-full border-2' />
                                )}
                            </a>
                        </div>
                    ))}
                </div>
            </div>
            {/* Reactors End */}
        </section>
    )
}

export default ContentDetail