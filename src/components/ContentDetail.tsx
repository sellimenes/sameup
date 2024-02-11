import axios from 'axios';
import { useEffect, useState } from 'react'
import { t } from 'i18next';
import { cn } from '@/lib/utils';
import { useFormatDistance } from '@/lib/useFormatDifference';

import { Check, MessageCircleMore, Plus, Repeat, Send, ThumbsUp } from 'lucide-react';
import CustomSvg from '@/components/CustomSvg';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import Reactors from '@/components/Reactors';

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
    const [data, setData] = useState<ContentDetailType>();
    const [isFollowing, setIsFollowing] = useState<boolean>(false);

    useEffect(() => {
        const getData = async () => {
            const response = await axios.get('/data.json');
            setData(response.data);
        }

        getData();
    }, []);

    if(!data) return (
        <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900 dark:border-slate-300"></div>
        </div>
    )
    return (
        <section className='border sm:rounded-xl sm:my-5 sm:py-5 pb-3 sm:pb-0 max-w-[620px] overflow-x-hidden w-full max-h-max mx-auto bg-white dark:bg-[#1B1F23]'>
            <TopNavigation />
            
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
                <Button 
                    onClick={() => setIsFollowing(!isFollowing)} 
                    variant='ghost' 
                    className='text-lg text-[#0a66c2] dark:text-[#71b7fb] hover:text-[#0a66c2] hover:bg-[rgba(112,181,249,0.2)]'
                >
                    {isFollowing ? <Check className='mr-1 h-6 w-6' /> : <Plus className="mr-1 h-4 w-4" />}
                    {t(isFollowing ? 'following' : 'follow')}
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
            <img src={data?.content.imageUrl} alt={data?.content.alt ? data?.content.alt : t('noAltForThisImage')} className='w-full' />
            {/* Content Image End */}

            {/* Reaction Icons Start */}
            <div className='mx-5 py-2 border-b dark:border-white/30 border-gray-300 flex items-center gap-1'>
                <CustomSvg name='like' size='18' />
                <span className='opacity-60 text-sm sm:hidden'>Selim Enes {t('and')} {data?.content?.reactions?.like} {t('others')}</span>
                <span className='opacity-60 text-sm hidden sm:block'>{data?.content?.reactions?.like}</span>
            </div>
            {/* Reaction Icons End */}

            {/* Reactors Start */}
            <Reactors data={data?.content.reactors} />
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
    const [commentValue, setCommentValue] = useState<string>('');
    const [isLiked, setIsLiked] = useState<boolean>(false);

    const actionBtnClass = 'hover:cursor-pointer p-3 flex flex-col sm:flex-row sm:gap-1 items-center flex-wrap hover:bg-gray-200 dark:hover:bg-[#45474b] rounded-sm opacity-60 dark:opacity-90 text-sm sm:text-lg font-semibold'

    useEffect(() => {
        const getUser = async () => {
            const response = await axios.get('/currentUser.json');
            setCurrentUser(response.data);
        }

        getUser();
    }, []);

    return(
        <div className='pb-5 sm:pb-0'>
            <div className='px-5 sm:mt-4 flex items-center justify-between gap-8'>
                <Dialog>
                    <DialogTrigger>
                        <div className='sm:p-3 hover:bg-gray-200 dark:hover:bg-[#45474b] rounded-sm flex items-center gap-2'>
                            <img src={currentUser?.profilePhotoUrl} alt={currentUser?.name} className='w-8 h-8 rounded-full overflow-hidden aspect-square max-w-max' />
                            <CustomSvg name='arrowDown' size='10' className='opacity-60' />
                        </div>
                    </DialogTrigger>
                    <DialogContent className='bg-white dark:bg-[#1B1F23]'>
                        <DialogHeader>
                            <DialogTitle className='text-2xl text-left'>{t('commentID')}</DialogTitle>
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

                <div className='flex items-center justify-between w-full'>
                    <button onClick={() => setIsLiked(!isLiked)} className={cn(actionBtnClass, isLiked && 'text-[#0a66c2] dark:text-[#71b7fb] hover:text-[#0a66c2] hover:bg-[rgba(112,181,249,0.2)]')}>
                        <ThumbsUp className='h-5 w-5 sm:h-6 sm:w-6 -scale-x-100' />
                        {t('like')}
                    </button>
                    <button className={actionBtnClass}>
                        <MessageCircleMore className='h-5 w-5 sm:h-6 sm:w-6' />
                        {t('comment')}
                    </button>
                    <button className={actionBtnClass}>
                        <Repeat className='h-6 w-6' />
                        {t('share')}
                    </button>
                    <button className={actionBtnClass}>
                        <Send className='h-5 w-5 sm:h-6 sm:w-6' />
                        {t('send')}
                    </button>
                </div>
            </div>
            <div className='py-3 flex items-center justify-between gap-3 border-t dark:border-white/30 border-gray-300 shadow-top dark:shadow-top-dark sm:shadow-none sm:border-none'>
                <img src={currentUser?.profilePhotoUrl} alt={currentUser?.name} className='ml-5 w-8 h-8 sm:w-12 sm:h-12 rounded-full overflow-hidden aspect-square min-w-max' />
                <Input placeholder={t('addComment')} value={commentValue} onChange={(e) => setCommentValue(e.target.value)} className='mr-5 pr-5 sm:rounded-full bg-transparent border-none sm:border-solid sm:border-black/60 sm:dark:border-white/60 focus-visible:ring-transparent sm:focus-visible:ring-background' />
                <Button variant={'ghost'} disabled={commentValue.length === 0} className='sm:hidden'>{t('publish')}</Button>
            </div>
        </div>
    )
}

const TopNavigation = () => {
    return (
        <div className='px-5 flex sm:hidden items-center justify-between h-12 border-b dark:border-white/30 border-gray-300 mb-5'>
            <CustomSvg name='back' size='24' />
            <CustomSvg name='more' />
        </div>
    )
}

export default ContentDetail