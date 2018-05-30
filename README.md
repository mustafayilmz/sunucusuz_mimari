# Sunucusuz Mimari
Bu repository, **Cumhuriyet Üniversitesi Bilgisayar Mühendisliği** bölümünün **Esnek Hesaplamaya ve Sunucusuz Mimariye Dayalı Yazılım Geliştirme Modellerinin Karşılaştırılması** adlı bitirme tezinde ele alınan uygulamaların kaynak kodlarını, RDS, Azure Functions, Google Cloud Functions ve AWS Lambda hizmetlerinin kullanımını bulundurmaktadır.

Üç farklı hizmet sağlayıcı için veri tabanı yapısı aynıdır. Önyüz kodları da sadece işlev bağlantıları dışında aynıdır. Veri tabanının tablo yapısı "Veri Tabanı Tablo Yapısı\employee.txt" dosyasında verilmiştir. 

İşlevlerde bulunan node_modules klasörü ve içindekileri, package.json dosyasının bulunduğu dizinde “npm install –save” komutunu, “komut istemi”nde çalıştırarak oluşturulabilir. Her bir işlevde node_modules klasörü olmak zorundadır. Uygulamaların kullandığı önyüz kodları "Ön Yüz Kodları\proje" içerisinde yer almaktadır. Uygulamaların ortak ön yüzünün görünümü ise şu şekildedir:
<p align="center">
	<img alt="Proje Ön Yüz Görüntüsü" src="/ekranGoruntuleri/projeOnYuzGoruntusu.PNG" title="Proje Ön Yüz Görüntüsü">
</p>

FaaS İşlevler(Functions)’i nodejs kullanılarak yazılmıştır. Üç uygulamanın kullandığı ortak veri tabanı Amazon Relational Database Service (RDS) hizmetinin sağladığı MySQL kullanılmaktadır. İlk olarak veri tabanını kullanmak için RDS hizmetinin nasıl kullanıldığı anlatılacaktır.

## RDS hizmetinin kullanılması
İlk olarak ana sayfadaki “AWS services” kısmına “rds” yazılmalı ve gelen “Relation Database Service” bağlantısına tıklanmalıdır.
<p align="center">
	<img alt="RDS hizmetinin bulunması" src="/ekranGoruntuleri/rds/1.PNG" title="RDS hizmetinin bulunması">
</p>

Açılan sayfadan “Instances” bağlantısına tıklanmalı ve ardından “Launch DB instance” butonuna basılıp yeni bir veri tabanı oluşturmaya başlanır.
<p align="center">
	<img alt="RDS Instances kısmı görünümü" src="/ekranGoruntuleri/rds/2.PNG" title="RDS Instances kısmı görünümü">
</p>

Açılan sayfada en altta bulunan “Only enable options eligible for RDS Free Usage Tier info” yazısının bulunduğu kutu işaretlenmelidir. Bu işlem, AWS’nin sadece Free Tier kullanım için sunduğu özelliklerinin seçilmesini sağlayacaktır. Ardından “Engine options” kısmında MySQL’i seçilmeli ve “Next” butonuna basılmalıdır.
<p align="center">
	<img alt="MySQL veri tabanı seçilmesi" src="/ekranGoruntuleri/rds/3.PNG" title="MySQL veri tabanı seçilmesi">
</p>

Açılan sayfada “Instance specifications” kısmındaki “DB engine version info” kısmından “mysql 5.7.19” sürümü seçilmelidir. Aynı sayfada aşağıda bulunan “Settings” kısmında, “DB instance identifier info” kısmına oluşturulacak rds hizmetindeki örneğin (instance) adı yazılmalıdır. Hemen altında bulunan “Master username” kısmına oluşturulacak MySQL için kullanıcı adı ve altında bulunan “Master password” ve “Confirm password” kısmına şifre yazılmalıdır. Ardından “Next” butonuna basılmalıdır.
<p align="center">
	<img alt="MySQL motorunun sürümü seçilmesi" src="/ekranGoruntuleri/rds/4.PNG" title="MySQL motorunun sürümü seçilmesi">
	<img alt="RDS örneğinin adı, MySQL veri tabanının kullanıcı adı ve şifresinin belirlenmesi" src="/ekranGoruntuleri/rds/5.PNG" title="RDS örneğinin adı, MySQL veri tabanının kullanıcı adı ve şifresinin belirlenmesi">
</p>

Açılan sayfada “Database options kısmında oluşturulacak veri tabanının ismi girilebilir. Eğer girilmezse sonradan veri tabanı bağlantısı için verilen bağlantı ve şifre ile kullanıcı tarafından oluşturulabilir. En alt kısımda bulunan “Launch DB Instance” butonuna basılarak RDS örneğini oluşturma işlemi tamamlanır. İşlemin tamamlandığına yönelik, yönlendirilen sayfada “View DB instance details” butonuna basılmalıdır.
<p align="center">
	<img alt="RDS örneği oluşturuldu mesajı görüntüsü" src="/ekranGoruntuleri/rds/6.PNG" title="RDS örneği oluşturuldu mesajı görüntüsü">
</p>

Açılan sayfanın alt kısmında yer alan “Connect” bölümünde, veri tabanına bağlanılacak bağlantı adresi yer alacaktır. Fakat örneği yeni oluşturulduğu için bu bağlantının oluşturulması biraz zaman alacaktır. Biraz zaman geçtikten sonra sayfa kullanıcı tarafından yenilendiğinde bu bağlantının oluşturulduğu görülecektir.
<p align="center">
	<img alt="RDS örneği sonrası bağlantının henüz oluşturulmadan önceki görüntüsü" src="/ekranGoruntuleri/rds/7.PNG" title="RDS örneği sonrası bağlantının henüz oluşturulmadan önceki görüntüsü">
	<img alt="MySQL motorunun sürümü seçilmesi" src="/ekranGoruntuleri/rds/8.PNG" title="MySQL motorunun sürümü seçilmesi">
</p>

“Connect” kısmındaki “Security group rules” kısmında, kullanıcıya hangi ip aralığından bağlantı kurabileceğini belirten bir kural oluşturmaktadır. Bir sonraki şekilde yer alan “Type” kısmı “CIDR/IP – Inbound” olan kuralda bulunan, “Rule” alanında ip adresi aralığı görülmektedir. Bu veri tabanına her ip adresinden bağlantı kurabilmek için, bu kuralın “Security group” alanında bulunan bağlantıya tıklanmalıdır. ‘Security group’ alanında bulunan parantez içindeki ifade kullanıcının “Group ID”sidir. Açılan sayfada, “Group ID”nin bulunduğu kutu seçilmeli ve alt kısımda bulunan “Inbound” alanına tıklanmalı ve “Edit” butonuna basılmalıdır. Ip adresinin bulunduğu satırda “Source” alanında “Anywhere” özelliği seçilmeli ve “Save” butonuna basılarak yapılmış olan işlem kaydedilmelidir. RDS hizmeti ile veri tabanı hizmeti oluşturulmuş ve bu hizmete “Connect” kısmında “Endpoint” alanında bulunan bağlantı adresi ile her yerden erişim sağlanabilir.
<p align="center">
	<img alt="RDS örneğinin erişim ayarının yapılması" src="/ekranGoruntuleri/rds/9.PNG" title="RDS örneğinin erişim ayarının yapılması">
</p>

## Azure Functions
### İşlev(Functions)’in oluşturulması
Sol kısımda bulunan “Kaynak oluştur” bağlantısına, ardından açılan paneldeki “Serverless Function App” bağlantısına tıklanır.
<p align="center">
	<img alt="İşlevin oluşturulma yerinin gösterilmesi" src="/ekranGoruntuleri/azure/1.PNG" title="İşlevin oluşturulma yerinin gösterilmesi">
</p>

Açılan panelde “Uygulama adı” kısmı eşsiz olmalıdır yoksa kabul etmeyecektir. “Abonelik” alanı, kullandıkça öde olmalıdır. “Kaynak Grubu” alanında ilk uygulama olduğu için “Yeni oluştur” seçilmelidir. “OS” alanında istenilen herhangi bir işletim sistemi seçilebilir. “Barındırma Planı” alanında ‘Tüketim Planı’ seçilmelidir. ‘Konum’ alanında “Batı Avrupa” seçilmelidir. “Depolama” alanında, daha önce depolama alanı oluşturulmadıysa “Yeni oluştur” seçilmelidir. Alt kısımda depolama adı, ‘Uygulama adı’ alanındaki ada göre oluşturulur, istenirse değiştirilebilir. İlgili alanları doldurduktan sonra “Oluştur” butonuna bastıktan sonra, bildirim kısmında (sağ üstte bulunan çan simgesine basınca gelen panel) “Dağıtım başarılı” bildirimi ile “İşlev Uygulaması” oluşturulmuş olunacaktır.
<p align="center">
	<img alt="İşlev Uygulaması oluşturma paneli" src="/ekranGoruntuleri/azure/2.PNG" title="İşlev Uygulaması oluşturma paneli">
</p>

Gelen bildirimde (“Dağıtım başarılı” başlıklı bildirim), “Kaynağa git” butonuna basılarak oluşturulan “İşlev Uygulaması”na gidilmektedir.  Oluşturulan uygulama seçilmelidir. “İşlevler” kısmının yanında bulunan “+” butonuna basılıp yeni işlev oluşturulur.
<p align="center">
	<img alt="Yeni İşlev oluşturma ekranı" src="/ekranGoruntuleri/azure/3.PNG" title="Yeni İşlev oluşturma ekranı">
</p>

Açılan panelde, “1. Senaryo seçin” alanında “Web Kancası + …”, “2. Dil seçin” alanında “Javascript” seçin ve “Bu işlevi oluşturun” butonuna basılarak işlev oluşturulur.
<p align="center">
	<img alt="İşlev özelliklerinin seçilmesi" src="/ekranGoruntuleri/azure/4.PNG" title="İşlev özelliklerinin seçilmesi">
</p>

İşlev oluşturulduğu zaman, javascript kodları ile yazılmış örnek kod yapılı oluşturulan projeye yönlendirecektir.
<p align="center">
	<img alt="Örnek kod yapılı İşlev" src="/ekranGoruntuleri/azure/5.PNG" title="Örnek kod yapılı İşlev">
</p>

Oluşturulan işleve, farklı bir yerde yazılmış kodları yüklemek için işlev uygulamasına tıklanmalıdır (yıldırım işaretli olan). Ardından “Platform özellikleri” > “GELİŞTİRME ARAÇLARI” altından Gelişmiş Araçlar(Kudu)” bağlantısına tıklanmalıdır. 
<p align="center">
	<img alt="Kudu yu açmak için izlenen yol" src="/ekranGoruntuleri/azure/6.PNG" title="Kudu yu açmak için izlenen yol">
</p>

Açılan sayfada üst tarafta bulunan “Debug console” menüsüne tıklanıp “CMD” bağlantısına tıklanmalıdır. Sırasıyla “site”, “wwwroot” bağlantılarına tıklanmalıdır. Ardından oluşturulan işlevin adında olan klasöre girilmelidir. İçinde bulunan index.js dosyasını “Name” alanının hemen solunda bulunan yuvarlak, ortasında çizgi bulunan simgeye basılarak silinmelidir. Ardından yazılan kodları index.js, node_modules klasörü ve package.json dosyası da dahil olmak üzere zip haline getirilmelidir ve sayfanın üzerine sürükleyip “Drag here to upload and unzip” alanına bırakılmalıdır. Yüklendikten sonra zip içindeki klasörler ve dosyalar listelenecektir. 
<p align="center">
	<img alt="Kodların oluşturulan işleve yüklenmesi" src="/ekranGoruntuleri/azure/7.PNG" title="Kodların oluşturulan işleve yüklenmesi">
</p>

Kodları karşıya yükledikten sonra, işlev uygulamasına dönülmeli ve yüklenilen işleve tıklanmalıdır.
<p align="center">
	<img alt="Oluşturulan işlevdeki yüklenen kodların görünümü" src="/ekranGoruntuleri/azure/8.PNG" title="Oluşturulan işlevdeki yüklenen kodların görünümü">
</p>

İşlevin hangi yöntemle çağrılınca cevap vereceğini yönetmek için, “Tümleştir” bağlantısına tıklanmalıdır. Açılan panelde “Allowed HTTP methods” alanında “Selected methods” özelliği seçilmelidir. “Authorization level” alanında şimdilik herhangi bir güvenliğe gerek duyulmadığı için “Anonymous” özelliği seçilebilir. Fakat “Function” özelliği seçilirse istek bağlantısına “code” parametresi eklenecektir. “Route template” alanına, bağlantı adresinde en sonda bulunan işlevin tetikleneceği isim belirtilmelidir. “Selected HTTP methods” alanında ise işlevin hangi yöntemle çağrılacağı belirlenmektedir.
<p align="center">
	<img alt="İşlevin çağırılma ayarlarının yapılması" src="/ekranGoruntuleri/azure/9.PNG" title="İşlevin çağırılma ayarlarının yapılması">
</p>

İşlev oluşturuldu, şuanda çalışır durumda fakat ajax vb. yerlerden istek atıldığında cevap vermeyecektir. Bunun için CORS ayarlarının yapılması gerekmektedir. Tekrardan işlev uygulamasına tıklanmalıdır (yıldırım işaretli olan). Ardından “Platform özellikleri” > “API” altından “CORS” bağlantısına tıklanır. Açılan panelde, “İZİN VERİLEN ÇIKIŞ NOKTALARI” alanı altında bulunan bağlantıların hepsini yanlarında bulunan üç noktaya basılıp “Sil”e tıklanmalıdır. Hiçbir şey kalmadığı zaman, boş kutuya tıklayıp * yazılmalı ve “Kaydet” butonuna basılıp çıkılmalıdır. Böylelikle işlev her yerden sorunsuz bir şekilde çağrılabilecektir.
<p align="center">
	<img alt="CORS ayarlarının yapılması" src="/ekranGoruntuleri/azure/10.PNG" title="CORS ayarlarının yapılması">
</p>

CORS ayarları bir kez yapılması halinde, tekrar yapılmasına gerek olmamaktadır. İşlevi test etmek için işlev uygulamasına dönülmeli ve işleve tıklanmalıdır. Ardından “Kaydet” ve “Çalıştır” butonlarının yanında bulunan “İşlev URL’sini al” bağlantısına tıklanmalı ve açılan paneldeki bağlantı adresini kopyalanıp tarayıcıda adres satırına yapıştırılıp, adrese gidilmelidir. 
<p align="center">
	<img alt="İşlevin test edilmesi" src="/ekranGoruntuleri/azure/11.PNG" title="İşlevin test edilmesi">
</p>

### Oluşturulan işlevlerin kaynak kodları
Azure Functions için oluşturulan işlevlerin kaynak kodları "Azure Functions\functions" dizini içinde yer almaktadır. 

"getallemployees" adlı oluşturulan işlevin, ön yüz kodlarında kullanılması için bağlantı adresini, "Ön Yüz Kodları\proje\index.html" dosyasında 81. satırdaki “url” özelliğinin değeri olarak verilmelidir. 

"insertemployees" adlı oluşturulan işlevin, ön yüz kodlarında kullanılması için bağlantı adresini, "Ön Yüz Kodları\proje\index.html" dosyasında 107. satırdaki “url” özelliğinin değeri olarak verilmelidir. 

"updateemployees" adlı oluşturulan işlevin, ön yüz kodlarında kullanılması için bağlantı adresini, "Ön Yüz Kodları\proje\index.html" dosyasında 130. satırdaki “url” özelliğinin değeri olarak verilmelidir. 

"deleteemployees" adlı oluşturulan işlevin, ön yüz kodlarında kullanılması için bağlantı adresini, "Ön Yüz Kodları\proje\index.html" dosyasında 201. satırdaki “url” özelliğinin değeri olarak verilmelidir. 

## Google Cloud Functions
### İşlev(Functions)’in oluşturulması
Ana sayfada, sol üstte bulunan “Google Cloud Platform” yazısının sol yanındaki menü butonuna basılmalı ve açılan panelde “Cloud İşlevleri”ne tıklanmalıdır.
<p align="center">
	<img alt="Cloud İşlevleri ne gidilmesi" src="/ekranGoruntuleri/google/1.PNG" title="Cloud İşlevleri ne gidilmesi">
</p>

Hesap ilk oluşturukduğu zaman “Faturalandırmayı etkinleştirdikten sonra Cloud işlevleri ürününü kullanabilirsiniz” başlıklı bir uyarı vermektedir. Bu kısımda “Faturalandırmayı etkinleştir” butonuna basılmalıdır. 
<p align="center">
	<img alt="Faturalandırmanın etkinleştirilmesi" src="/ekranGoruntuleri/google/2.PNG" title="Faturalandırmanın etkinleştirilmesi">
</p>

Gelen panelde “HESAP BELİRLE” butonuna basılıp hesap belirlenmelidir. Ardından “Cloud Fonksiyonları API’sı etkin değil” uyarısı bulunan bir sayfaya yönlendirecektir. Eğer yönlendirme olmazsa, menü aracılığı ile Cloud İşlevleri’ne yeniden gidilmelidir. Ardından “API’yı Etkinleştir” butonuna basılmalıdır. 
<p align="center">
	<img alt="Cloud Fonksiyonları API si etkinleştir uyarısı" src="/ekranGoruntuleri/google/3.PNG" title="Cloud Fonksiyonları API si etkinleştir uyarısı">
</p>

Gelen sayfada “İşlev oluştur” butonuna basılmalıdır. Bu kısımlar ilk defa işlevi oluşturmaya çalışıldığı için gerçekleştirilmektedir. Bir sonraki işlev oluşturmada faturalandırma etkinleştirme ve API etkinleştirme işlemleri olmamaktadır.
<p align="center">
	<img alt="İlk işlevi oluşturmada gelen bilgilendirme" src="/ekranGoruntuleri/google/4.PNG" title="İlk işlevi oluşturmada gelen bilgilendirme">
</p>

Gelen sayfada, “Ad” alanına işlevin adı yazılmalıdır, “Ayrılan bellek” alanına işlevin kullanacağı bellek miktarı seçilmelidir. “Tetikleyici” alanında “HTTP tetikleyicisi” seçilmelidir. “Kaynak kod” alanında “ZIP yüklemesi” seçilmelidir ve node_modules klasörünün içindekiler de dahil olmak üzere, index.js ve package.json ile birlikte zip haline getirilmelidir. Ardından “ZIP dosyası” alanında “Göz at” butonuna basarak oluşturulan zip dosyasını seçilmelidir.
<p align="center">
	<img alt="İşlev için gerekli alanların doldurulması ve zip dosyasının oluşturulması" src="/ekranGoruntuleri/google/5.PNG" title="İşlev için gerekli alanların doldurulması ve zip dosyasının oluşturulması">
</p>

“Depolama paketi” alanına, işlevlerin bulutta nereye depolanacağı seçilecektir. Hesap ilk kez oluşturulduğu için depolama paketi olmayacaktır. “Depolama paketi” alanında “Göz at” butonuna basılmalıdır. Gelen panelde büyüteç simgeli butonun solunda bulunan butona basılmalıdır.
<p align="center">
	<img alt="Depolama paketinin bulunmadığını gösteren bildirim" src="/ekranGoruntuleri/google/6.PNG" title="Depolama paketinin bulunmadığını gösteren bildirim">
</p>

Açılan panelde “Ad” alanına paketin adı yazılmalıdır. “Varsayılan depolama sınıfı” alanında “Multi-Regional” seçeneği seçilmelidir. Sonra “Oluştur” butonuna basılmalıdır.
<p align="center">
	<img alt="Depolama paketinin oluşturulması" src="/ekranGoruntuleri/google/7.PNG" title="Depolama paketinin oluşturulması">
</p>

Paketi oluşturulduktan sonra, bu paketi doğrudan veya içerisine klasör oluşturarak kullanılabilir. Klasör oluşturmak için büyüteç simgeli butonun solunda bulunan butona basılmalıdır. 
<p align="center">
	<img alt="Depolama paketine klasör oluşturulması" src="/ekranGoruntuleri/google/8.PNG" title="Depolama paketine klasör oluşturulması">
</p>

Açılan kutuya isim yazıp onaylanmalıdır, sonra klasöre girilip ve “Seç” butonuna basılmalıdır.
<p align="center">
	<img alt="Klasörün seçilmesi" src="/ekranGoruntuleri/google/9.PNG" title="Klasörün seçilmesi">
</p>

“Yürütülecek işlev” alanında, index.js içindeki ana fonksiyonun ismi yazılmalıdır. “URL” alanındaki bağlantı adresi kopyalanmalıdır. İşlev oluşturulması tamamlanınca bu adres ile erişim işleve sağlanacaktır. “Oluştur” butonuna basılarak işlev oluşturulur.
<p align="center">
	<img alt="İşlevin oluşturulması" src="/ekranGoruntuleri/google/10.PNG" title="İşlevin oluşturulması">
</p>

Yönlendirilen sayfada, işlev oluşturulunca işlevin başında yeşil tik işareti oluşacaktır.
<p align="center">
	<img alt="İşlevin oluşturulmasının tamamlandıktan sonraki hali" src="/ekranGoruntuleri/google/11.PNG" title="İşlevin oluşturulmasının tamamlandıktan sonraki hali">
</p>

Kopyalanan adres tarayıcıda adres satırına yapıştırılıp ve gidilmelidir. 
<p align="center">
	<img alt="İşlevin tarayıcıdaki çıktısı" src="/ekranGoruntuleri/google/12.PNG" title="İşlevin tarayıcıdaki çıktısı">
</p>

Cors ayarları dışardan yapılamamaktadır. Bu yüzden nodejs geliştiricileri tarafından sağlanan Cors kütüphanesi kullanılarak ajax vb. yerlerden istek atılmasına izin verilmiştir. Ayrıca bağlantı adresinin hangi yöntemle istek attığı yine kod tarafından ayarlanmaktadır. Bağlantı adresinin sonunda bulunan isim ne ise, işlevinizin adı da odur. Yani işlevin adı, uç noktasından bağımsız tanımlanamaz.

### Oluşturulan işlevlerin kaynak kodları
Google Cloud Functions için oluşturulan işlevlerin kaynak kodları "Google Cloud Functions\functions" dizini içinde yer almaktadır. 

"getallemployees" adlı oluşturulan işlevin, ön yüz kodlarında kullanılması için bağlantı adresini, "Ön Yüz Kodları\proje\index.html" dosyasında 81. satırdaki “url” özelliğinin değeri olarak verilmelidir. 

"insertemployees" adlı oluşturulan işlevin, ön yüz kodlarında kullanılması için bağlantı adresini, "Ön Yüz Kodları\proje\index.html" dosyasında 107. satırdaki “url” özelliğinin değeri olarak verilmelidir. 

"updateemployees" adlı oluşturulan işlevin, ön yüz kodlarında kullanılması için bağlantı adresini, "Ön Yüz Kodları\proje\index.html" dosyasında 130. satırdaki “url” özelliğinin değeri olarak verilmelidir. 

"deleteemployees" adlı oluşturulan işlevin, ön yüz kodlarında kullanılması için bağlantı adresini, "Ön Yüz Kodları\proje\index.html" dosyasında 201. satırdaki “url” özelliğinin değeri olarak verilmelidir. 

## AWS Lambda
### İşlev(Functions)’in oluşturulması
İlk olarak ana sayfadaki “AWS services” kısmına “lambda” yazılmalı ve gelen “Lambda” bağlantısına tıklanmalıdır.
<p align="center">
	<img alt="Lambda hizmetini bulma" src="/ekranGoruntuleri/aws/1.PNG" title="Lambda hizmetini bulma">
</p>

Açılan sayfada “Get started” başlıklı alanın içinde bulunan turuncu renkteki “Create a function” butonuna basılmalıdır. Ardından “Create function” başlığının hemen altında bulunan “Author from scratch” seçeneği seçilmelidir. Alt kısımda bulunan “Author from scratch” başlıklı alanda, “Name” alanına işlevin adı yazılmalı, “Runtime” alanında “Node.js 6.10” seçeneği seçilmelidir. “Role” alanında, daha önce Lambda için kullanıcı tarafından role oluşturulmadığından dolayı yeni bir role oluşturmak gerekmektedir. Yeni bir rol oluşturmak için “Create a new role from template(s)” seçilmeli ve “Role name” alanına ismi girilmelidir. Eğer önceden role oluşturulduysa “Role” alanında “Choose an existing role” seçeneği seçilmeli ve altındaki “Existing role” alanında önceden oluşturulmuş role seçilmelidir. “Policy templates” alanını boş bırakılmalı ve turuncu renkteki “Create function” butonuna basılmalıdır.
<p align="center">
	<img alt="İşlev oluşturma" src="/ekranGoruntuleri/aws/2.PNG" title="İşlev oluşturma">
</p>

İşlev oluşturulduktan sonra açılan sayfada bulunan, “Function code” kısmındaki “Code entry type” alanında “Upload a .ZIP file” seçeneği seçilmeli ve “Upload” butonuna basılıp, içerisinde node_modules klasörü ve içindekilerde dahil olmak üzere ve index.js, package.json dosyalarının da bulunduğu zip dosyası seçilmelidir. Ardından sağ üst kısımda beliren turuncu renkteki “Save” butonuna basılmalıdır. Ardından kodların yüklenmiş olduğu görünecektir.
<p align="center">
	<img alt="İşlev kodlarının yüklenmesi" src="/ekranGoruntuleri/aws/3.PNG" title="İşlev kodlarının yüklenmesi">
	<img alt="İşlev kodlarının yüklenmiş hali" src="/ekranGoruntuleri/aws/4.PNG" title="İşlev kodlarının yüklenmiş hali">
</p>

İşlevin dışardan kullanılabilmesi için (bir bağlantı adresi ile), işleve bir API Gateway tanımı yapılmalıdır. Bunun için ana sayfada “AWS services” kısmına “api gateway” yazılmalı ve gelen “API Gateway” bağlantısına tıklanmalıdır.
<p align="center">
	<img alt="API Gateway hizmetinin bulunması" src="/ekranGoruntuleri/aws/5.PNG" title="API Gateway hizmetinin bulunması">
</p>

Ardından açılan sayfada, mavi renkteki “Get Started” butonuna basılmalıdır. Gelen uyarıyı geçmek için “OK” butonuna basılmalıdır. “Create new API” başlığının altında bulunan “New API” seçeneğini seçilmelidir. “Settings” başlığı altında bulunan alanda “API name” alanına API için isim yazılmalı ve mavi renkteki “Create API” butona basılmalıdır.
<p align="center">
	<img alt="API oluşturulması" src="/ekranGoruntuleri/aws/6.PNG" title="API oluşturulması">
</p>

Yönlendirilen sayfada sol tarafta bulunan “Resources” bağlantısına tıklanmalıdır. Ardından açılan sayfadaki “Resources” alanının altında bulunan “/” satırı seçilmelidir. “Actions” butonuna basılmalı ve “Create Resources” bağlantısına tıklanmalıdır.
<p align="center">
	<img alt="Yeni Resource oluşturmak için izlenen yol" src="/ekranGoruntuleri/aws/7.PNG" title="Yeni Resource oluşturmak için izlenen yol">
</p>

Oluşturulacak Resource için, “Resource Name” alanına isim yazılmalıdır. “Enable API Gateway CORS” seçeneği işaretlenmelidir. Ardından “Create Resource” butonuna basılmalıdır.
<p align="center">
	<img alt="Resource oluştururken doldurulması gereken alanlar" src="/ekranGoruntuleri/aws/8.PNG" title="Resource oluştururken doldurulması gereken alanlar">
</p>

“Resources” alanının altında oluşturulan Resource görünecektir. Seçilmeli ve “Actions” butonuna basılıp “Create Method” bağlantısına tıklanmalıdır.
<p align="center">
	<img alt="Yeni tetikleme yöntemi oluşturmak için izlenen yol" src="/ekranGoruntuleri/aws/9.PNG" title="Yeni tetikleme yöntemi oluşturmak için izlenen yol">
</p>

Beliren alanda, oluşturulan “Resource”un hangi yöntem ile tetiklenecekse seçilmeli ve yanındaki tik işaretli butona basılmalıdır.
<p align="center">
	<img alt="Tetikleme yönteminin seçilmesi" src="/ekranGoruntuleri/aws/10.PNG" title="Tetikleme yönteminin seçilmesi">
</p>

Açılan panelde, “Integration type” alanında “Lambda Function” seçeneği seçilmelidir. “Lambda Region” alanına oluşturulan işlevin bölgesi (region) seçilmelidir. Ardından “Lambda Function” alanında oluşturulan işlevin ismi yazılmalı ve mavi renkteki “Save” butonuna basılmalıdır.
<p align="center">
	<img alt="Yöntem ayarlarının yapılması" src="/ekranGoruntuleri/aws/11.PNG" title="Yöntem ayarlarının yapılması">
</p>

Ardından “Actions” butonuna basılıp “Deploy API” bağlantısına tıklanmalıdır. Açılan panelde “Deployment stage” alanında, önceden Stage oluşturulmadığı için “[New Stage]” seçeneği seçilmeli ve bu Stage için “Stage name” alanına isim girilmelidir. Ardından “Deploy” butonuna basılmalıdır. 
<p align="center">
	<img alt="Stage oluşturulması" src="/ekranGoruntuleri/aws/12.PNG" title="Stage oluşturulması">
</p>

Yönlendirilen sayfada “Invoke URL:” yazısının hemen yanında bulunan bağlantı adresi, oluşturulan Stage için kök adrestir.
<p align="center">
	<img alt="Oluşturulan Stage için bağlantı adresi" src="/ekranGoruntuleri/aws/13.PNG" title="Oluşturulan Stage için bağlantı adresi">
</p>

Oluşturulan Resource’un ismini, bu bağlantının sonuna /resourceismi şeklinde yazılıp tarayıcıda çalıştırılırsa işlev tetiklenmiş olacaktır.
<p align="center">
	<img alt="Tarayıcıdan işlevin çağırılması" src="/ekranGoruntuleri/aws/14.PNG" title="Tarayıcıdan işlevin çağırılması">
</p>

Ajax vb. yerlerden isteklere cevap vermek için CORS ayarları yapılmalıdır. Bunun için sol taraftaki “Resources” bağlantısına tıklanmalıdır. Oluşturulan Resource seçilmeli ve “Actions” butonuna basılıp “Enable CORS” bağlantısına tıklanmalıdır.
<p align="center">
	<img alt="CORS ayarını yapmak için izlenen yol" src="/ekranGoruntuleri/aws/15.PNG" title="CORS ayarını yapmak için izlenen yol">
</p>

Açılan panelde “Methods” kısmında, ajax vb. yerlerden istek atıldığı zaman hangi tetiklenme yöntemlerine izin verilecekse işaretlenmeli ve “Enable CORS and replace existing CORS headers” butonuna basılmalıdır.
<p align="center">
	<img alt="CORS ayarının yapılması" src="/ekranGoruntuleri/aws/16.PNG" title="CORS ayarının yapılması">
</p>

Ardından oluşturulan Resource seçilmeli ve “Actions” butonuna basılıp “Deploy API” bağlantısına tıklanmalıdır. Açılan panelde “Deployment stage” alanında, oluşturulan Stage adı seçilmeli ve “Deploy” butonuna basılmalıdır. İşlevin oluşturulma ve tetiklenme ayarlarının yapılma işlemi tamamlanmıştır.

### Oluşturulan işlevlerin kaynak kodları
AWS Lambda için oluşturulan işlevlerin kaynak kodları "AWS Lambda\functions" dizini içinde yer almaktadır. 

"getallemployees" adlı oluşturulan işlevin, ön yüz kodlarında kullanılması için bağlantı adresini, "Ön Yüz Kodları\proje\index.html" dosyasında 81. satırdaki “url” özelliğinin değeri olarak verilmelidir. 

"insertemployees" adlı oluşturulan işlevin, ön yüz kodlarında kullanılması için bağlantı adresini, "Ön Yüz Kodları\proje\index.html" dosyasında 107. satırdaki “url” özelliğinin değeri olarak verilmelidir. 

"updateemployees" adlı oluşturulan işlevin, ön yüz kodlarında kullanılması için bağlantı adresini, "Ön Yüz Kodları\proje\index.html" dosyasında 130. satırdaki “url” özelliğinin değeri olarak verilmelidir. 

"deleteemployees" adlı oluşturulan işlevin, ön yüz kodlarında kullanılması için bağlantı adresini, "Ön Yüz Kodları\proje\index.html" dosyasında 201. satırdaki “url” özelliğinin değeri olarak verilmelidir. 