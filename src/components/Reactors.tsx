import { t } from 'i18next'
import CustomSvg from './CustomSvg'

type Props = {
    data: any
}

const Reactors = ({data}: Props) => {
    // Get random items from the data and choose how many to show.
    function getRandomSubarray(arr: any[], size: number) {
        const shuffled = arr.slice(0);
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled.slice(0, Math.min(size, arr.length));
    }
  return (
    <div className='px-5 hidden sm:block'>
        <p className='mt-3 mb-2 text-lg font-light'>{t('reactions')}</p>
        <div className='flex items-center gap-2'>
        {getRandomSubarray(data || [], 8).map((reactor: any, index: number) => (
            <div key={index} className='relative'>
                <a href={reactor.profileUrl}>
                    <img src={reactor.imageUrl} className='w-12 h-12 rounded-full overflow-hidden' loading='lazy' />
                    {reactor.reactionType === 'like' && (
                        <CustomSvg name='like' size='18' className='absolute bottom-0 right-0 border-white rounded-full border-2' />
                    )}
                </a>
            </div>
        ))}
        {data?.length > 8 && (
            <div className='relative'>
                <a href='#' className='w-12 h-12 border rounded-full flex items-center justify-center border-gray-300 dark:border-white/30'>
                    <span className='text-lg font-bold'>+{data.length - 8}</span>
                </a>
            </div>
        
        )}
        </div>
    </div>
  )
}

export default Reactors