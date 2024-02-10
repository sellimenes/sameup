import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type Props = {}

const LanguageToggle = (props: Props) => {
    const { i18n: {changeLanguage, language} } = useTranslation();

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="uppercase">{language}</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuCheckboxItem
            checked={language === "en"}
            onCheckedChange={() => changeLanguage('en')}
          >
            English
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={language === "tr"}
            onCheckedChange={() => changeLanguage('tr')}
          >
            Türkçe
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
}

export default LanguageToggle

 {/* <h1>
          Our Translated Header: 
          {t('headerTitle', { appName: "App for Translations" })}
        </h1>
        <h3>
          Current Language: {currentLanguage}
        </h3> */}