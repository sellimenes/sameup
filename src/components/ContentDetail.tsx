import axios from 'axios';
import { useEffect, useState } from 'react'
import { t } from 'i18next';
import { useFormatDistance } from '@/lib/useFormatDifference';

import { MessageCircleMore, Plus, Repeat, Send, ThumbsUp } from 'lucide-react';
import CustomSvg from '@/components/CustomSvg';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"

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
        <section className='border sm:rounded-xl max-w-[620px] w-full max-h-max my-6 py-5 mx-auto bg-white dark:bg-[#1B1F23]'>
            {/* Content Detail Header Start */}
            <div className='px-5 flex items-start justify-between'>
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
            <div className='my-2'>
                <p className='px-5'>{data?.content.title}</p>
                <p className='px-5 font-light'>
                    {data?.content.tags.map((tag, index) => (
                        <span key={index}>#{tag} </span>
                    ))}
                </p>
            </div>
            {/* Content Detail Header End */}

            {/* Content Image Start */}
            <img src={data?.content.imageUrl} alt={data?.content.alt ? data?.content.alt : t('noAltForThisImage')} />
            {/* Content Image End */}

            {/* Reaction Icons Start */}
            <div className='mx-5 py-2 border-b flex items-center gap-1'>
                <CustomSvg name='like' size='18' />
                {/* TODO: Like sayısı gözükmüyor. */}
                <span className='opacity-60 text-sm'>{data?.content?.reactions?.like ? 0 : 8}</span>
            </div>
            {/* Reaction Icons End */}

            {/* Reactors Start */}
            <div className='px-5'>
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

            {/* Social Action Bar Start */}
            <SocialActions />
            {/* Social Action Bar End */}
        </section>
    )
}

type SubChannelType = {
    name: string;
    slug: string;
    photoUrl: string;
};

type UserType = {
    name: string;
    profileSlug: string;
    profilePhotoUrl: string;
    subChannels: SubChannelType[];
};

const SocialActions = () => {
    const [currentUser, setCurrentUser] = useState<UserType>();
    useEffect(() => {
        const getUser = async () => {
            const response = await axios.get('/currentUser.json');
            setCurrentUser(response.data);
        }

        getUser();
    }, []);
    return(
        <div className='px-5'>
            <div className='mt-8 flex items-stretch justify-between'>
                <Dialog>
                    <DialogTrigger>
                        <div className='p-3 hover:bg-gray-200 dark:hover:bg-[#45474b] rounded-sm flex items-center gap-2'>
                            <img src={currentUser?.profilePhotoUrl} alt={currentUser?.name} className='w-7 h-7 rounded-full overflow-hidden aspect-square' />
                            <CustomSvg name='arrowDown' size='10' className='opacity-60' />
                        </div>
                    </DialogTrigger>
                    <DialogContent className='bg-white dark:bg-[#1B1F23]'>
                        <DialogHeader>
                            <DialogTitle className='text-2xl'>{t('commentID')}</DialogTitle>
                        </DialogHeader>
                        <Separator className='my-1 bg-[#45474b] dark:bg-gray-200/60' />
                        <RadioGroup defaultValue="selim-enes-erdogan">
                            <div className="flex items-center space-x-2 w-full mb-2">
                                <img src={currentUser?.profilePhotoUrl} alt={currentUser?.name} className='w-14 h-14' />
                                <p>{currentUser?.name}</p>
                                <RadioGroupItem value={currentUser?.profileSlug || 'selim-enes-erdogan'} id={currentUser?.profileSlug} className='!ml-auto' />
                            </div>
                            {currentUser?.subChannels.map((subChannel, index) => (
                                <div key={index} className="flex items-center space-x-2 w-full mb-2">
                                    <img src={subChannel.photoUrl} alt={subChannel.name} className='w-14 h-14' />
                                    <p>{subChannel.name}</p>
                                    <RadioGroupItem value={subChannel.slug} id={subChannel.slug} className='!ml-auto' />
                                </div>
                            ))}
                        </RadioGroup>
                        <Separator className='my-1 bg-[#45474b] dark:bg-gray-200/60' />
                        <DialogFooter>
                            <Button>{t('save')}</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

                <div className='p-3 flex items-center flex-wrap gap-1 hover:bg-gray-200 dark:hover:bg-[#45474b] rounded-sm opacity-60 dark:opacity-90 text-lg font-semibold'>
                    <ThumbsUp className='h-6 w-6 -scale-x-100' />
                    {t('like')}
                </div>
                <div className='p-3 flex items-center flex-wrap gap-1 hover:bg-gray-200 dark:hover:bg-[#45474b] rounded-sm opacity-60 dark:opacity-90 text-lg font-semibold'>
                    <MessageCircleMore className='h-6 w-6' />
                    {t('comment')}
                </div>
                <div className='p-3 flex items-center flex-wrap gap-1 hover:bg-gray-200 dark:hover:bg-[#45474b] rounded-sm opacity-60 dark:opacity-90 text-lg font-semibold'>
                    <Repeat className='h-6 w-6' />
                    {t('share')}
                </div>
                <div className='p-3 flex items-center flex-wrap gap-1 hover:bg-gray-200 dark:hover:bg-[#45474b] rounded-sm opacity-60 dark:opacity-90 text-lg font-semibold'>
                    <Send className='h-6 w-6' />
                    {t('send')}
                </div>
            </div>
            <div className='mt-5 flex items-center justify-between gap-3'>
                <img src={currentUser?.profilePhotoUrl} alt={currentUser?.name} className='w-10 h-10 rounded-full overflow-hidden aspect-square' />
                <Input placeholder={t('addComment')} className='rounded-full bg-transparent border-black/60 dark:border-white/60' />
            </div>
        </div>
    )
}

export default ContentDetail