function _classCallCheck(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,n){for(var a=0;a<n.length;a++){var t=n[a];t.enumerable=t.enumerable||!1,t.configurable=!0,"value"in t&&(t.writable=!0),Object.defineProperty(e,t.key,t)}}function _createClass(e,n,a){return n&&_defineProperties(e.prototype,n),a&&_defineProperties(e,a),e}(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{Yj9t:function(e,n,a){"use strict";a.r(n);var t,i,o=a("ofXK"),r=a("tyNb"),s=a("fXoL"),c=((t=function(){function e(){_classCallCheck(this,e)}return _createClass(e,[{key:"ngOnInit",value:function(){}}]),e}()).\u0275fac=function(e){return new(e||t)},t.\u0275cmp=s.Ib({type:t,selectors:[["app-user-sign-up"]],decls:2,vars:0,template:function(e,n){1&e&&(s.Ub(0,"p"),s.zc(1,"user-sign-up works!"),s.Tb())},styles:[""]}),t),l=a("3Pt+"),u=a("AytR").a.apiUrl,p=a("tk/3"),m=((i=function(){function e(n){_classCallCheck(this,e),this.httpClient=n}return _createClass(e,[{key:"register",value:function(e){return this.httpClient.post("".concat(u,"companies/register"),e)}}]),e}()).\u0275fac=function(e){return new(e||i)(s.Yb(p.a))},i.\u0275prov=s.Kb({token:i,factory:i.\u0275fac,providedIn:"root"}),i),b=a("xHqg"),g=["Accounting","Airlines/Aviation","Alternative Dispute Resolution","Alternative Medicine","Animation","Apparel/Fashion","Architecture/Planning","Arts/Crafts","Automotive","Aviation/Aerospace","Banking/Mortgage","Biotechnology/Greentech","Broadcast Media","Building Materials","Business Supplies/Equipment","Capital Markets/Hedge Fund/Private Equity","Chemicals","Civic/Social Organization","Civil Engineering","Commercial Real Estate","Computer Games","Computer Hardware","Computer Networking","Computer Software/Engineering","Computer/Network Security","Construction","Consumer Electronics","Consumer Goods","Consumer Services","Cosmetics","Dairy","Defense/Space","Design","E-Learning","Education Management","Electrical/Electronic Manufacturing","Entertainment/Movie Production","Environmental Services","Events Services","Executive Office","Facilities Services","Farming","Financial Services","Fine Art","Fishery","Food Production","Food/Beverages","Fundraising","Furniture","Gambling/Casinos","Glass/Ceramics/Concrete","Government Administration","Government Relations","Graphic Design/Web Design","Health/Fitness","Higher Education/Acadamia","Hospital/Health Care","Hospitality","Human Resources/HR","Import/Export","Individual/Family Services","Industrial Automation","Information Services","Information Technology/IT","Insurance","International Affairs","International Trade/Development","Internet","Investment Banking/Venture","Investment Management/Hedge Fund/Private Equity","Judiciary","Law Enforcement","Law Practice/Law Firms","Legal Services","Legislative Office","Leisure/Travel","Library","Logistics/Procurement","Luxury Goods/Jewelry","Machinery","Management Consulting","Maritime","Market Research","Marketing/Advertising/Sales","Mechanical or Industrial Engineering","Media Production","Medical Equipment","Medical Practice","Mental Health Care","Military Industry","Mining/Metals","Motion Pictures/Film","Museums/Institutions","Music","Nanotechnology","Newspapers/Journalism","Non-Profit/Volunteering","Oil/Energy/Solar/Greentech","Online Publishing","Other Industry","Outsourcing/Offshoring","Package/Freight Delivery","Packaging/Containers","Paper/Forest Products","Performing Arts","Pharmaceuticals","Philanthropy","Photography","Plastics","Political Organization","Primary/Secondary Education","Printing","Professional Training","Program Development","Public Relations/PR","Public Safety","Publishing Industry","Railroad Manufacture","Ranching","Real Estate/Mortgage","Recreational Facilities/Services","Religious Institutions","Renewables/Environment","Research Industry","Restaurants","Retail Industry","Security/Investigations","Semiconductors","Shipbuilding","Sporting Goods","Sports","Staffing/Recruiting","Supermarkets","Telecommunications","Textiles","Think Tanks","Tobacco","Translation/Localization","Transportation","Utilities","Venture Capital/VC","Veterinary","Warehousing","Wholesale","Wine/Spirits","Wireless","Writing/Editing"],d=a("kmnG"),f=a("d3UM"),h=a("FKr1");function y(e,n){if(1&e&&(s.Ub(0,"mat-option",4),s.zc(1),s.Tb()),2&e){var a=n.$implicit;s.lc("value",a),s.Cb(1),s.Bc(" ",a," ")}}var C,v,I=((v=function(){function e(){_classCallCheck(this,e),this.industries=g}return _createClass(e,[{key:"ngOnInit",value:function(){}}]),e}()).\u0275fac=function(e){return new(e||v)},v.\u0275cmp=s.Ib({type:v,selectors:[["app-step1"]],inputs:{companyInfoFormGroup:["group","companyInfoFormGroup"]},decls:5,vars:2,consts:[[3,"formGroup"],["formControlName","name"],["formControlName","industry","placeholder","Select industry"],[3,"value",4,"ngFor","ngForOf"],[3,"value"]],template:function(e,n){1&e&&(s.Ub(0,"form",0),s.Pb(1,"input",1),s.Ub(2,"mat-form-field"),s.Ub(3,"mat-select",2),s.yc(4,y,2,2,"mat-option",3),s.Tb(),s.Tb(),s.Tb()),2&e&&(s.lc("formGroup",n.companyInfoFormGroup),s.Cb(4),s.lc("ngForOf",n.industries))},directives:[l.p,l.k,l.e,l.b,l.j,l.d,d.b,f.a,o.j,h.n],styles:[""]}),v),S=((C=function(){function e(){_classCallCheck(this,e)}return _createClass(e,[{key:"ngOnInit",value:function(){}}]),e}()).\u0275fac=function(e){return new(e||C)},C.\u0275cmp=s.Ib({type:C,selectors:[["app-step2"]],inputs:{accountInfoFormGroup:["group","accountInfoFormGroup"]},decls:12,vars:3,consts:[[3,"formGroup"],["formControlName","full_name"],["formControlName","role"],["formControlName","email"],["formControlName","password"],["type","radio","name","gender","checked","","id","male","formControlName","gender",3,"value"],["for","male"],["type","radio","name","gender","id","female","formControlName","gender",3,"value"],["for","female"],["formControlName","confirm_pass"]],template:function(e,n){1&e&&(s.Ub(0,"form",0),s.Pb(1,"input",1),s.Pb(2,"input",2),s.Pb(3,"input",3),s.Pb(4,"input",4),s.Pb(5,"input",5),s.Ub(6,"label",6),s.zc(7,"Male"),s.Tb(),s.Pb(8,"input",7),s.Ub(9,"label",8),s.zc(10,"Female"),s.Tb(),s.Pb(11,"input",9),s.Tb()),2&e&&(s.lc("formGroup",n.accountInfoFormGroup),s.Cb(5),s.lc("value","male"),s.Cb(3),s.lc("value","female"))},directives:[l.p,l.k,l.e,l.b,l.j,l.d,l.m],styles:[""]}),C),T=["Afghanistan","Albania","Algeria","American Samoa","Andorra","Angola","Anguilla","Antarctica","Antigua and Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas (the)","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia (Plurinational State of)","Bonaire, Sint Eustatius and Saba","Bosnia and Herzegovina","Botswana","Bouvet Island","Brazil","British Indian Ocean Territory (the)","Brunei Darussalam","Bulgaria","Burkina Faso","Burundi","Cabo Verde","Cambodia","Cameroon","Canada","Cayman Islands (the)","Central African Republic (the)","Chad","Chile","China","Christmas Island","Cocos (Keeling) Islands (the)","Colombia","Comoros (the)","Congo (the Democratic Republic of the)","Congo (the)","Cook Islands (the)","Costa Rica","Croatia","Cuba","Cura\xe7ao","Cyprus","Czechia","C\xf4te d'Ivoire","Denmark","Djibouti","Dominica","Dominican Republic (the)","Ecuador","Egypt","El Salvador","Equatorial Guinea","Eritrea","Estonia","Eswatini","Ethiopia","Falkland Islands (the) [Malvinas]","Faroe Islands (the)","Fiji","Finland","France","French Guiana","French Polynesia","French Southern Territories (the)","Gabon","Gambia (the)","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guadeloupe","Guam","Guatemala","Guernsey","Guinea","Guinea-Bissau","Guyana","Haiti","Heard Island and McDonald Islands","Holy See (the)","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran (Islamic Republic of)","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kiribati","Korea (the Democratic People's Republic of)","Korea (the Republic of)","Kuwait","Kyrgyzstan","Lao People's Democratic Republic (the)","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macao","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Marshall Islands (the)","Martinique","Mauritania","Mauritius","Mayotte","Mexico","Micronesia (Federated States of)","Moldova (the Republic of)","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Myanmar","Namibia","Nauru","Nepal","Netherlands (the)","New Caledonia","New Zealand","Nicaragua","Niger (the)","Nigeria","Niue","Norfolk Island","Northern Mariana Islands (the)","Norway","Oman","Pakistan","Palau","Palestine, State of","Panama","Papua New Guinea","Paraguay","Peru","Philippines (the)","Pitcairn","Poland","Portugal","Puerto Rico","Qatar","Republic of North Macedonia","Romania","Russian Federation (the)","Rwanda","R\xe9union","Saint Barth\xe9lemy","Saint Helena, Ascension and Tristan da Cunha","Saint Kitts and Nevis","Saint Lucia","Saint Martin (French part)","Saint Pierre and Miquelon","Saint Vincent and the Grenadines","Samoa","San Marino","Sao Tome and Principe","Saudi Arabia","Senegal","Serbia","Seychelles","Sierra Leone","Singapore","Sint Maarten (Dutch part)","Slovakia","Slovenia","Solomon Islands","Somalia","South Africa","South Georgia and the South Sandwich Islands","South Sudan","Spain","Sri Lanka","Sudan (the)","Suriname","Svalbard and Jan Mayen","Sweden","Switzerland","Syrian Arab Republic","Taiwan (Province of China)","Tajikistan","Tanzania, United Republic of","Thailand","Timor-Leste","Togo","Tokelau","Tonga","Trinidad and Tobago","Tunisia","Turkey","Turkmenistan","Turks and Caicos Islands (the)","Tuvalu","Uganda","Ukraine","United Arab Emirates (the)","United Kingdom of Great Britain and Northern Ireland (the)","United States Minor Outlying Islands (the)","United States of America (the)","Uruguay","Uzbekistan","Vanuatu","Venezuela (Bolivarian Republic of)","Viet Nam","Virgin Islands (British)","Virgin Islands (U.S.)","Wallis and Futuna","Western Sahara","Yemen","Zambia","Zimbabwe","\xc5land Islands"],P=a("bTqV");function k(e,n){if(1&e&&(s.Ub(0,"mat-option",6),s.zc(1),s.Tb()),2&e){var a=n.$implicit;s.lc("value",a),s.Cb(1),s.Bc(" ",a," ")}}var F,M=((F=function(){function e(){_classCallCheck(this,e),this.register=new s.o,this.countries=T}return _createClass(e,[{key:"ngOnInit",value:function(){}},{key:"registerCompany",value:function(){this.register.emit()}}]),e}()).\u0275fac=function(e){return new(e||F)},F.\u0275cmp=s.Ib({type:F,selectors:[["app-step3"]],inputs:{companyDetailsFormGroup:["group","companyDetailsFormGroup"]},outputs:{register:"registerCompany"},decls:9,vars:2,consts:[[3,"formGroup"],["formControlName","phone"],["formControlName","country"],[3,"value",4,"ngFor","ngForOf"],["formControlName","address"],["mat-raised-button","",3,"click"],[3,"value"]],template:function(e,n){1&e&&(s.Ub(0,"form",0),s.Pb(1,"input",1),s.Pb(2,"input",2),s.Ub(3,"mat-form-field"),s.Ub(4,"mat-select"),s.yc(5,k,2,2,"mat-option",3),s.Tb(),s.Tb(),s.Pb(6,"input",4),s.Ub(7,"button",5),s.cc("click",(function(){return n.registerCompany()})),s.zc(8,"Save"),s.Tb(),s.Tb()),2&e&&(s.lc("formGroup",n.companyDetailsFormGroup),s.Cb(5),s.lc("ngForOf",n.countries))},directives:[l.p,l.k,l.e,l.b,l.j,l.d,d.b,f.a,o.j,P.a,h.n],styles:[""]}),F),U=a("NFeN");function G(e,n){1&e&&(s.Ub(0,"mat-icon"),s.zc(1,"done"),s.Tb())}function w(e,n){1&e&&s.zc(0,"Company info")}function R(e,n){1&e&&s.zc(0,"Account info")}function A(e,n){1&e&&s.zc(0,"Company details")}var z,N,E,B,L=((z=function(){function e(n,a){_classCallCheck(this,e),this.fb=n,this.companiesService=a,this.currentStep=1}return _createClass(e,[{key:"ngOnInit",value:function(){this.initForm()}},{key:"stepChanged",value:function(e){}},{key:"initForm",value:function(){this.companyRegistrationForm=this.fb.group({companyInfo:this.fb.group({name:["",l.o.required],industry:["",l.o.required]}),accountInfo:this.fb.group({full_name:["",l.o.required],role:["",l.o.required],email:["",l.o.required],password:["",l.o.required],confirm_pass:["",l.o.required],gender:["",l.o.required]}),contactDetails:this.fb.group({phone:["",l.o.required],address:["",l.o.required],country:["",l.o.required]})})}},{key:"registerCompany",value:function(){console.log(this.companyRegistrationForm.getRawValue()),this.companiesService.register(this.companyRegistrationForm.getRawValue()).subscribe((function(e){}))}},{key:"companyInfoFormGroup",get:function(){return this.companyRegistrationForm.controls.companyInfo}},{key:"accountInfoFormGroup",get:function(){return this.companyRegistrationForm.controls.accountInfo}},{key:"companyDetailsFormGroup",get:function(){return this.companyRegistrationForm.controls.contactDetails}}]),e}()).\u0275fac=function(e){return new(e||z)(s.Ob(l.c),s.Ob(m))},z.\u0275cmp=s.Ib({type:z,selectors:[["app-company-sign-up"]],decls:16,vars:8,consts:[[1,"register"],[1,"register-title"],[1,"register-form",3,"formGroup"],["labelPosition","bottom",3,"selectedIndex","selectionChange"],["stepper",""],["matStepperIcon","edit"],[3,"stepControl"],["matStepLabel",""],[3,"group"],[3,"group","registerCompany"]],template:function(e,n){1&e&&(s.Ub(0,"div",0),s.Ub(1,"h1",1),s.zc(2," Information required for incorporation of new Company "),s.Tb(),s.Ub(3,"form",2),s.Ub(4,"mat-horizontal-stepper",3,4),s.cc("selectionChange",(function(e){return n.stepChanged(e)})),s.yc(6,G,2,0,"ng-template",5),s.Ub(7,"mat-step",6),s.yc(8,w,1,0,"ng-template",7),s.Pb(9,"app-step1",8),s.Tb(),s.Ub(10,"mat-step",6),s.yc(11,R,1,0,"ng-template",7),s.Pb(12,"app-step2",8),s.Tb(),s.Ub(13,"mat-step",6),s.yc(14,A,1,0,"ng-template",7),s.Ub(15,"app-step3",9),s.cc("registerCompany",(function(){return n.registerCompany()})),s.Tb(),s.Tb(),s.Tb(),s.Tb(),s.Tb()),2&e&&(s.Cb(3),s.lc("formGroup",n.companyRegistrationForm),s.Cb(1),s.lc("selectedIndex",n.currentStep-1),s.Cb(3),s.lc("stepControl",n.companyRegistrationForm.get("companyInfo")),s.Cb(2),s.lc("group",n.companyInfoFormGroup),s.Cb(1),s.lc("stepControl",n.companyRegistrationForm.get("personalInfo")),s.Cb(2),s.lc("group",n.accountInfoFormGroup),s.Cb(1),s.lc("stepControl",n.companyRegistrationForm.get("companyDetails")),s.Cb(2),s.lc("group",n.companyDetailsFormGroup))},directives:[l.p,l.k,l.e,b.a,b.d,b.b,b.c,I,S,M,U.a],styles:[""]}),z),D=[{path:"login",component:(N=function(){function e(){_classCallCheck(this,e)}return _createClass(e,[{key:"ngOnInit",value:function(){}}]),e}(),N.\u0275fac=function(e){return new(e||N)},N.\u0275cmp=s.Ib({type:N,selectors:[["app-login"]],decls:57,vars:0,consts:[[1,"login-content"],[1,"login-left-side"],["src","assets/images/login-1.svg",1,"login-big-img"],[1,"left-block-1"],[1,"left-block-2"],["src","assets/images/login-2.svg"],[1,"login-text-5"],[1,"login-text-6"],[1,"left-block-3"],[1,"fab","fa-facebook-f"],[1,"fab","fa-pinterest"],[1,"fab","fa-twitter"],[1,"login-right-side"],[1,"login-text-1"],["href","register.html",1,"login-text-2"],[1,"login-form"],[1,"login-text-3"],[1,"login-text-4"],[1,"login-block-1"],[1,"login-google"],[1,"fab","fa-google"],[1,"login-social"],[1,"fab","fa-facebook-square"],[1,"line-block"],[1,"line-1"],[1,"login-item"],[1,"logos-item-label"],["placeholder","Email*",1,"logos-item-input"],["placeholder","Password*","type","password",1,"logos-item-input"],["href","forgot",1,"forgot-password"],[1,"login-item","login-item-checkbox"],["type","checkbox"],[1,"checkbox-text"],[1,"login-buttons"],[1,"reset-btn"],[1,"fas","fa-chevron-left"],[1,"login-btn"]],template:function(e,n){1&e&&(s.Ub(0,"section",0),s.Ub(1,"div",1),s.Pb(2,"img",2),s.Ub(3,"div",3),s.Ub(4,"div",4),s.Pb(5,"img",5),s.Ub(6,"p",6),s.zc(7,"Welcome Back!"),s.Tb(),s.Tb(),s.Ub(8,"p",7),s.zc(9,"In This Togheter. Keeping You Securely Connected Wherever You Are."),s.Tb(),s.Ub(10,"div",8),s.Pb(11,"i",9),s.Pb(12,"i",10),s.Pb(13,"i",11),s.Tb(),s.Tb(),s.Tb(),s.Ub(14,"div",12),s.Ub(15,"p",13),s.zc(16,"Don't have an account ? "),s.Ub(17,"a",14),s.zc(18,"Sign Up Here"),s.Tb(),s.Tb(),s.Ub(19,"form",15),s.Ub(20,"p",16),s.zc(21,"Sign In"),s.Tb(),s.Ub(22,"p",17),s.zc(23,"Chose versions of Sign In."),s.Tb(),s.Ub(24,"div",18),s.Ub(25,"a",19),s.Pb(26,"i",20),s.zc(27," Sign Up With Google"),s.Tb(),s.Ub(28,"a",21),s.Pb(29,"i",11),s.Tb(),s.Ub(30,"a",21),s.Pb(31,"i",22),s.Tb(),s.Tb(),s.Ub(32,"div",23),s.Pb(33,"span",24),s.Ub(34,"span"),s.zc(35,"OR"),s.Tb(),s.Pb(36,"span",24),s.Tb(),s.Ub(37,"div",25),s.Ub(38,"label",26),s.zc(39,"Email Address"),s.Tb(),s.Pb(40,"input",27),s.Tb(),s.Ub(41,"div",25),s.Ub(42,"label",26),s.zc(43,"Password"),s.Tb(),s.Pb(44,"input",28),s.Ub(45,"a",29),s.zc(46,"Forgot Password?"),s.Tb(),s.Tb(),s.Ub(47,"div",30),s.Pb(48,"input",31),s.Ub(49,"label",32),s.zc(50,"Stay Singed In"),s.Tb(),s.Tb(),s.Ub(51,"div",33),s.Ub(52,"a",34),s.Pb(53,"i",35),s.zc(54,"Reset All"),s.Tb(),s.Ub(55,"a",36),s.zc(56,"Sign In"),s.Tb(),s.Tb(),s.Tb(),s.Tb(),s.Tb())},styles:[""]}),N)},{path:"user-registration",component:c},{path:"company-registration",component:L}],O=((E=function e(){_classCallCheck(this,e)}).\u0275mod=s.Mb({type:E}),E.\u0275inj=s.Lb({factory:function(e){return new(e||E)},imports:[[r.a.forChild(D)],r.a]}),E),_=a("gNIp"),q=((B=function e(){_classCallCheck(this,e)}).\u0275mod=s.Mb({type:B}),B.\u0275inj=s.Lb({factory:function(e){return new(e||B)},imports:[[o.c,l.f,l.n,_.a],l.f,l.n,_.a]}),B);a.d(n,"AuthModule",(function(){return x}));var H,x=((H=function e(){_classCallCheck(this,e)}).\u0275mod=s.Mb({type:H}),H.\u0275inj=s.Lb({factory:function(e){return new(e||H)},imports:[[o.c,O,q]]}),H)}}]);