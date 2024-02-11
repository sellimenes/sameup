import { t } from 'i18next'
import CustomSvg from './CustomSvg'

type Props = {
    data: any
}

const Reactors = ({data}: Props) => {
  return (
    <div className='px-5 hidden sm:block'>
        <p className='mt-4 mb-2 text-lg font-light'>{t('reactions')}</p>
        <div className='flex items-center gap-2'>
            {data?.map((reactor: any, index: number) => (
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
  )
}

export default Reactors