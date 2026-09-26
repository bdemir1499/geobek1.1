# Geobek Projesi Çalışma Kuralları (Project Workflow Rules)

Bu proje (Geobek) özel bir güvenlik (Obfuscation) altyapısına sahiptir. Bu projede kod yazarken veya değişiklik yaparken **KESİNLİKLE** aşağıdaki kurallara uymalısın:

1. **Orijinal Kodlar src/ İçindedir:**
   Ana dizindeki pp.js, katla.js, cokgen.js gibi .js dosyaları **ŞİFRELENMİŞTİR (Obfuscated)**. Bu dosyaları asla doğrudan düzenleme veya okumaya çalışma! 
   Herhangi bir JS kodunu okuman veya değiştirmen gerekirse, KESİNLİKLE src/ klasörü içindeki orijinal dosyaları (src/app.js vb.) kullanmalısın.

2. **Değişiklik Sonrası Derleme (Build):**
   src/ klasöründeki dosyalarda bir değişiklik yaptıktan sonra, bu değişikliğin ana dizine yansıması ve şifrelenmesi için MUTLAKA terminalden şu komutu çalıştırmalısın:
   
ode build.js
   
3. **Aynı Wi-Fi Koruması (Public IP Check):**
   Sistemde dış STUN sunucuları açıktır ancak güvenlik için src/app.js içerisinde bir 'Public IP' eşleşme kontrolü vardır. Cihazlar aynı internet ağına bağlı değilse bağlantı reddedilir. Bu güvenlik mimarisini bozacak değişiklikler yapma.

Kullanıcı senden bir özellik veya hata düzeltmesi istediğinde, doğrudan src/ klasörüne git, değişikliği yap, 
ode build.js komutunu çalıştır ve kullanıcıdan GitHub Desktop üzerinden Push yapmasını iste.