import LanguageToggle from "./LanguageToggle"
import { ModeToggle } from "./ModeToggle"

type Props = {}

const Header = (props: Props) => {
  return (
    <header className="w-full max-h-[70px] border-b py-2 px-6 shadow-sm">
        <div className="flex items-center justify-between container">
          <img src="./sameup-logo.webp" alt="logo" className="max-h-[50px]" />
          <div className="flex items-center gap-2">
            <ModeToggle />
            <LanguageToggle />
          </div>
        </div>
    </header>
  )
}

export default Header