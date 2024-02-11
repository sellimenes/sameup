import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const LanguageToggle = () => {
    const { i18n: {changeLanguage, language} } = useTranslation();

    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size={'icon'} className="uppercase bg-transparent">{language}</Button>
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