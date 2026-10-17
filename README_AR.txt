BLUE VOXEL BUTTONS — ZIP
========================

هذه هي حزمة الملفات المطلوبة، وليست صورة.
تحتوي على:
- blue-voxel-buttons.css: تصميم أزرار زرقاء، عصا تحكم، شريط أدوات، وزر متجر/محفظة.
- preview.html: صفحة لمعاينة التصميم على الهاتف.
- README_AR.txt: تعليمات عربية.

طريقة دمجها في مشروع اللعبة:
1. فك الضغط.
2. ارفع blue-voxel-buttons.css إلى مستودع GitHub بجانب index.html.
3. داخل <head> في index.html أضف:
   <link rel="stylesheet" href="./blue-voxel-buttons.css">
4. أضف class="blue-voxel-btn" إلى الأزرار الحالية في كود HTML.
   مثال: <button class="blue-voxel-btn">بناء</button>
5. للزر الأساسي أضف blue-voxel-btn--primary.
6. لزر المتجر/المحفظة أضف blue-voxel-btn--wallet.
7. لا تستبدل أزرار اللعبة الأصلية كلها قبل أخذ نسخة احتياطية؛ اربط الأصناف بعناصرها الحالية حتى لا تفقد وظائفها.

ملاحظة: CSS يغيّر المظهر فقط، وليس وظائف الأزرار. يجب تعديل عناصر الواجهة الموجودة في مشروعك حتى يظهر التصميم داخل اللعبة.
