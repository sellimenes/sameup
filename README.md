# SameUp Interview Task

 - Canlı demo adresi: https://sameup.vercel.app/
 - Herhangi bir .env dosyası bulunmamaktadır. 
 - Repo clone işleminden sonra `npm install` ile gereksinimler yüklenebilir, `npm run dev` ile proje açılabilir.
 - Mail ile gönderilmiş görsel, %80 oranında kaynak olarak kullanıldı. LinkedIn geliştirici araçlarından mümkün olduğunca faydalanılmadı.
 - Font ve bazı ikon farklılıklarının dikkate alınmamasını rica ederim.

## Kullanılan Teknolojiler:

 - Vite 5.1.0
 - React 18.2.0
 - ShadCN UI (Tailwind CSS)
 - clsx
 - Axios
 - i18n

## Dosya Yolları ve Dosyalar

 - Dummy JSON dosyaları `public` klasörü içerisinde yer almakta.
 - `Component -> UI` klasörü, ShadCN ile gelen Button, Dropdown gibi reusable UI elementlerini içermekte.
 - `Lib -> utils.ts` dosyası clsx konfigürasyonunu içermekte. ShadCN ile otomatik oluşturulmuştur.
 - `Lib -> useFormatDifference.ts` dosyası, custom hook olarak oluşturuldu. Backend'den gelen Date formatındaki veriyi, '1 ay önce' gibi tarih farkına dönüştürüyor.
 - `Components -> CustomSvg.tsx` dosyası, herhangi bir kütüphane kullanılmadan eklenen SVG görsellerinin düzenli olması için oluşturuldu. Yeniden kullanılabilir bir şekilde SVG'leri buraya ekleyip tüm projede kullanabiliyoruz.
 - `Locale` klasörü, i18n ile birlikte çoklu dil özelliğini kullandığımız JSON dosyalarını içermekte.
 - `App.tsx` dosyası, projenin tek sayfası. İçerisine eklenen component'ler ile *layout* mantığında kullanıldı.
 - `Components -> ContentDetail.tsx` dosyası, post detay için ana component görevi görmekte.

### ContentDetail.tsx

 - `ContentDetail` fonksiyonu, dosyanın içerisinde bulunan default fonksiyon.
 - Ek olarak `SocialActions` ve `TopNavigation` fonksiyonları aynı dosya içerisinde kullanıldı. Yalnızca bu component içerisinde kullanılacağı için farklı bir component olarak oluşturulmadı.
 
 ### Header ve Footer
 
 - Header ve Footer, ek olarak oluşturuldu. Herhangi bir kaynağa *pixel-perfect* ya da *güzel* olma amacı taşımıyor.
 - Header'da dil ve dark mode için butonlar eklendi.

## Ek Notlar

 - Tüm interface'ler `Types` isimli bir klasörde toplanabilirdi. 
 - Gerçek projede fetch işlemleri `try/catch` içerisinde kullanılmalı.
 - Proje büyüklüğüne göre Button içerisinde inline fonksiyon yerine `useCallback` kullanılabilir. Bu sayede her render anında onClick içerisindeki fonksiyonlar yeniden oluşturulmaz.
 - Render içerisinde ağır işlemler varsa `useMemo` kullanılabilir. Bu sayede her render anında tüm component sıfırdan render edilmez. Yalnızca dependency içeriği değiştikçe tüm component yeniden render olur.
 - Öncelikli olmayan görseller `lazy load` ile kullanılabilir.
 - JSX içerisinde birbirini tekrar eden class içerikleri varsa, bunlar bir değişken içine tanımlanabilir ve bu değişken class olarak verilebilir.