let config = {
	hosts: [
	  "row1.vfsglobal.com",
	  "visa.vfsglobal.com",
	  "row7.vfsglobal.com"
	]
};
/* Funçoes de ajuda */
/* Selector no html */
const query = function(query, index = null){
    let q = query.split(" ");
  
    if(q[0] == "all"){
        q = document.querySelectorAll(query.replace("all ", "").trim());
        return index != null ? q[index] : q;
    }
  
    return  document.querySelector(query.trim());
},
/* Aguardar para iniciar */
wait = function(callback){
    let timer = null;
    let call = function(){
        if(!callback()){
            timer = clearInterval(timer);
        }
    };
    timer = setInterval(call, 1500);
},
/* Separar o host da url completa e iniciar programa */
short = function(url, callback, error = () => {}){
	let ret = false;
    url = url.split("://")[1].split("/")[0];
	
    for(var key in config.hosts){
        if(config.hosts[key] == url){
            callback(location.origin + location.pathname);
			ret = true;
            break;
        }
    }

	if(!ret) error();
};
/* Processar texto para áudio */
const audio = function(text){
    speechSynthesis.speak(new SpeechSynthesisUtterance(text));

},
/* Conversão de tempo em milésimos */
time = function(time){
    time = time.toLowerCase() + " ";
    let seconds = time.split("s"),
        minutes = time.split("min"),
        hours = time.split("h"),
        days = time.split("days"),
        day = time.split("day"),
        months = time.split("months"),
        month = time.split("month"),
        years = time.split("years"),
        year = time.split("year");
    const convert = function(time, mili = 1){
        return 1000 * parseInt(time) * mili;
    };
  
    if(seconds.length == 2){
        time = convert(seconds[0]);
    } else if(minutes.length == 2) {
        time = convert(minutes[0], 60);
    } else if(hours.length == 2) {
        time = convert(hours[0], 60 * 60);
    } else if(days.length == 2) {
        time = convert(days[0], 60 * 60 * 24);
    } else if(day.length == 2) {
        time = convert(day[0], 60 * 60 * 24);
    } else if(months.length == 2) {
        time = convert(months[0], 60 * 60 * 24 * 30);
    } else if(month.length == 2) {
        time = convert(month[0], 60 * 60 * 24 * 30);
    } else if(years.length == 2) {
        time = convert(years[0], 60 * 60 * 24 * 30 * 12);
    } else if(year.length == 2) {
        time = convert(year[0], 60 * 60 * 24 * 30 * 12);
    } else {
        time = 1000;
    }
  
    return time;
},
/* Actualzar a página a cada 10 segundos para resolver erros */
refresh = function(query, submitButton){
    if(!submitButton || !query){
      setTimeout(function(){
        location.reload();
      }, time("15s"));
    }
},
/* Notificar usuário sobre abertura */
notify = function(callback){
    open("http://grupo-devdesign.atwebpages.com/audio/seeyouagain.wav", "_blank");
    setTimeout(callback, 800);
},
r = function(rand){
    let random = parseInt((Math.random()) * rand);
    return random > rand ? r(rand) : random;
},
reloadVFS = function(){
	const a = query(".AccordionPanelContent ul.leftNav-ul>li>a[href]");

	if(a){
		a.click();
	} else {
		refresh(a);
	}
},
css = function(elem, obj){
	if(typeof obj == "object"){
		for(var key in obj){
			elem.style[key] = obj[key];
		}
	}
},
removeSpecialCharacters = function(str) {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toUpperCase();
},
openVFS = function(){
	open('https://visa.vfsglobal.com/ago/pt/prt/book-an-appointment', "_blank");
},
openANTECIPEVFS = function(){
	open('http://grupo-devdesign.atwebpages.com', "_blank");
},
submitButton = query("#submitbuttonId") || query(("#btnContinue")) || query('input.submitbtn[type="submit"]') || query("#btnConfirm");
/* Cookies */
function Cookie(cname, cvalue, time=1000*60*60*24, cpath="/"){
    if(cname&&cvalue) return setCookie(cname,cvalue,time, cpath);
    else if(cname) return getCookie(cname);
    else if(typeof cvalue=="object") return deleteCookie(cname,cvalue.path);
    else return getCookies();
}
function setCookie(cname="string", cvalue="string", time=1000*60*60*24, cpath="/") {
    const d = new Date();
    d.setTime(d.getTime() + (time));
    let expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=" + cpath;
}
function getCookie(cname="string"){
    let cookies=document.cookie;
    let ret;

    cookies=cookies.split("; ");

    for(var key in cookies){
        let i=cookies[key].match('=');
        if(i) i=i.index;

        const name=cookies[key].slice(0,i);
        let value=cookies[key].slice(i+1);
        if(value.slice(-1)==';')
            value=value.slice(0,-1);

        if(name===cname){
            ret=value;
            break;
        }
    }

    return ret;
}
function getCookies(){
    let cookies=document.cookie;
    let ret;

    ret=cookies.split(" ");
    if(ret.length==0 || cookies.trim()=="") return null;

    cookies={};
    for(var key in ret){
        const i=ret[key].match('=').index;
        const name=ret[key].slice(0,i);
        let value=ret[key].slice(i+1);
        if(value.slice(-1)==';')
            value=value.slice(0,-1);

        cookies[name]=value;
    }

    return cookies;
}
function deleteCookie(cname,path="/"){
    setCookie(cname,null,-1000*1000,path);
}
function extractNumbers(text) {
	let numbers = text.match(/\d+/g);

	return numbers ? numbers.map(Number) : [];
}  
function getColorName(rgb) {
	const [r, g, b] = rgb;

	if (r > g && r > b) {
		return 'Vermelho';
	} else if (g > r && g > b) {
		return 'Verde';
	} else if (b > r && b > g) {
		return 'Azul';
	} else if (r === g && r > b) {
		return 'Amarelo';
	} else if (r === b && r > g) {
		return 'Rosa';
	} else if (g === b && g > r) {
		return 'Ciano';
	} else if (r === g && g === b && r > 200) {
		return 'Branco';
	} else if (r === g && g === b && r < 100) {
		return 'Preto';
	}

	return 'Cor não identificada';
}
var timer5min = null;
var timer6min = null;
let sapp = true;
function stopPROFeatures(){
	timer5min = clearInterval(timer5min);
	timer5min = clearTimeout(timer5min);
	timer6min = clearInterval(timer6min);
	timer6min = clearTimeout(timer6min);
	sapp = false;
}
/* End */

const
	a = function(){
		if(location.origin == "https://row7.vfsglobal.com"){

		}

		if(location.origin == "https://row1.vfsglobal.com"){

		}
	},
	b = function(){
		const a = query(".AccordionPanelContent ul.leftNav-ul>li>a[href]");

		if(a){
			a.click();
		} else {
			refresh(a);
		}
	},
	c = function(){
		if(!query("#VisaCategoryId")) return;
		var timer = null;
		let apply = function(cat = 1){
			setTimeout(function(){
				const vcat = query("#VisaCategoryId");
				
				if(vcat){
					vcat.value = vcat.options[cat].value;
					vcat.options[cat].selected = true;
					vcat.dispatchEvent(new Event("change"));
				}
			}, time("3s"));
		};
		chrome.storage.local.set({MaxControl: 0, PassportUsed: null});

		setTimeout(()=>{
			const CurrentCountryId = query("#MissionId").options[1].value;
			const VisaCategoryIdElement = query("#VisaCategoryId");
			const LocationIdElement = query("#LocationId");
			let CurrentCountry = null;

			if(CurrentCountryId == 60){
				CurrentCountry = "Bélgica";
			}else if(CurrentCountryId == 33){
				CurrentCountry = "Brasil";
			}else if(CurrentCountryId == 17){
				CurrentCountry = "Portugal";
			}

			VisaCategoryIdElement.addEventListener("change", function(ev){
				if(ev.target.value != 0){
					var change = null;
					change = setInterval(()=>{
						const img = query(".loaderImg");
						const div = query("#loading");

						if(img.style.display == "none" && div.style.display == "none"){
							change = clearInterval(change);
							if(query("#lblDate").innerText.trim() != ""){
								timer = clearInterval(timer);
								timer = true;
								setInterval(() => {audio(`${CurrentCountry} aberto!`)}, time("1.4s"));
								stopPROFeatures();
							}else{
								audio(`${CurrentCountry} fechado!`);
							}
						}
					}, 1000);
				}
			});

			if(CurrentCountry == "Bélgica"){
				let id = 1;

				VisaCategoryIdElement.innerHTML = `
					<option value="0">Select Appointment Category</option>
					<option value="5126">Business</option>
					<option value="5166">Family Reunion</option>
					<option value="5253">Medical</option>
					<option value="5127">Other</option>
					<option value="5125">Private visit</option>
					<option value="5169">Professional Permit</option>
					<option value="5167">Study Visa</option>
					<option value="5124">Tourism</option>
					<option value="5123">Transit</option>
					<option value="5168">Work Permit</option>
				`;

				LocationIdElement.value = LocationIdElement.options[1].value;
				LocationIdElement.options[1].selected = true;

				timer = setInterval(()=>{
					if(timer !== true){
						if(id == VisaCategoryIdElement.options.length){
							id = 1;
						}
						apply(id++);
					}
				}, time("7s"));
			}

			if(CurrentCountry == "Brasil"){
				const verifySlot = function(){
					const vcat = query("#VisaCategoryId");
					if(vcat){
						vcat.value = vcat.options[0].value;
						vcat.options[0].selected = true;
						vcat.dispatchEvent(new Event("change"));
					}
					apply(5);
				};
				setInterval(verifySlot, time("1.3min"));
				verifySlot();
			}
			
			if(CurrentCountry == "Portugal"){
				const verifySlot = function(){
					const vcat = query("#VisaCategoryId");
					if(vcat){
						vcat.value = vcat.options[0].value;
						vcat.options[0].selected = true;
						vcat.dispatchEvent(new Event("change"));
					}
					apply(1);
				};
				setInterval(verifySlot, time("2.3min"));
				verifySlot();
			}
			
			timer5min = setTimeout(reloadVFS, time("5min"));
		}, time("5s"));
	},
	d = function(){
		const max = extractNumbers(query(".frm-container>div[style]").innerText)[0];

		chrome.storage.local.get(["MaxControl"], ({MaxControl})=>{
			if(max == MaxControl){
				query("input[type='submit'].submitbtn").click();
			} else {
				chrome.storage.local.set({MaxControl: MaxControl + 1});
				query(".frm-container>a.submitbtn").click();
			}
		});
	},
	e = function(){
		chrome.storage.local.get(["PassportUsed"], ({PassportUsed})=>{
			let clicked = false;
			PassportUsed = PassportUsed || [];

			query("all [data-passport]").forEach(element => {
				if(clicked === false && !PassportUsed.includes(element.dataset.passport)){
					clicked = true;
					element.click();
				}
			});
		});
	},
	f = function(){
		query("form *[type='submit']").click();
	},
	g = function(){
		setTimeout(function(){
			let days = document.querySelectorAll(`td.fc-widget-content`);
			
			for (let i = 0; i < days.length; i++) {
				const day = days[i];
				const color = day.style.backgroundColor;
				
				if(color.trim() == ""){continue;}
				
				if(getColorName(extractNumbers(color)) == "Verde"){
					day.addEventListener("click", ()=>{
						const time = document.querySelectorAll('input[name="selectedTimeBand"]')[r(2)];
							time.click();
						
						console.log(`Data: ${day.dataset.date}.\nHorário: ${time.parentElement.nextElementSibling.innerText}`);
						
						query("#calform").submit();
					});
				}
			}

			setInterval(()=>audio("Seleciona a data para terminar o agendamento!"), 2500);
		}, 500);
	},
	h = function(){
		if(query("#ReachVFS")){
			query("#ReachVFS").click();
			query("#IAgree").click();
			
			query("#ApplicantListForm").submit();
		} else {
			i();
		}
	},
	i = function(){
		setInterval(()=>audio("Agendamento concluído!"), 2500);
	}
;

(function(){
	"use strict";

	const PasteContentInVFSPage = ({data: {data, category}, PassportUsed, ExtensionDelete})=>{
		let RowBody = query(".AccordionPanelContent>.leftpanel-links ul.leftNav-ul");
		PassportUsed = PassportUsed || [];
			
		if(RowBody){
			const appListElement = ({Style, PassportNumber, Body}, title = false) => {
				const li = document.createElement("li");
					li.innerText = Body;
				if(Style) li.setAttribute("style", Style);

				if(title){
					css(li, {
						background: "#00305d",
						color: "#FFFFFF",
						border: "none",
						height: "3rem",
						marginTop: "1.4rem",
						marginBottom: "1.4rem",
						paddingTop: "5px",
						paddingLeft: "10px"
					});
				}else{
					css(li, {
						style: "pointer",
						padding: "10px"
					});
					li.classList.add("inactive-link");
					li.setAttribute("data-passport", PassportNumber);
				}

				return li;
			};

			RowBody.append(appListElement({Body: "Preenchimento Automático v4.0"}, true));

			for(var key in data){
				let user = data[key];
				let style = '';

				if(user.VisaCategoryId){
					style = "border: #FFFFFF 1px solid!important;";
				}

				if(!PassportUsed.includes(user.PassportNumber)){
					RowBody.append(appListElement({
						Style: style,
						PassportNumber: user.PassportNumber,
						Body: `${user.FirstName.toUpperCase()} ${user.LastName.toUpperCase()} ${style != '' ? ' | ' + user.VisaCategoryId : ''}`
					}));
				}
			}

			query("all [data-passport]").forEach(element => {
				element.addEventListener("click", function(){
					data.forEach(user => {
						if(this.dataset.passport == user.PassportNumber && !PassportUsed.includes(user.PassportNumber)){
							for(var key in user){
								let int = parseInt(key);
								if(isNaN(int)){
									let input = query(`[name="${key}"]`);

									if(input){
										if(input.name == "VisaCategoryId") continue;
										if(input.name == "NationalityId"){
											for(var i = 0; i < input.options.length; i++){
												if(input.options[i].innerText.trim().toUpperCase() == user[key].trim().toUpperCase()){
													input.value = user[key];
													input.options[i].selected = true;
													break;
												}
											}
										} else if(input.type == "date"){
											let date = user[key].split("/"); // format: d/m/Y 

											input.value = `${date[2]}-${date[1]}-${date[0]}`; // Requires yyyy-MM-dd
										} else {
											input.value = "";
											input.value = removeSpecialCharacters(user[key]);
										}
									}
								}
							}
							
							const btn = query("#submitbuttonId");
							if(btn) {
								const used = PassportUsed;
								used[used.length] = user.PassportNumber;
								chrome.storage.local.set({
									PassportUsed: used
								});
								query("#AddApplicantFormID").submit();
							}
						} else {
							const h1 = query(".rightpanel>h1");
							
							setTimeout((lastText) => {
								h1.innerText = lastText;
								h1.style.color = "black";
							}, 1000, h1.innerText);

							h1.innerText = "Passporte já adicionado!";
							h1.style.color = "red";
						}
					});
				});
			});
		}

		const d = new Date().getTime();
		const c = Cookie('extdelete') || ExtensionDelete;
		let deleteAll = true;
		if(c){
			deleteAll = false;
			if(parseInt(c) <= parseInt(d)) deleteAll = true;
			else timer6min = setInterval(reloadVFS, time("6min"));
		}

		if(deleteAll) chrome.storage.local.set({data: null});
	};
	const ClickToOpenBookingSite=()=>{
		const VISA_BOOK_PTR = location.pathname.includes("/prt/");
		const VISA_BOOK_BEL = location.pathname.includes("/bel/");
		const VISA_BOOK_BRA = location.pathname.includes("/bra/");
		
		if(VISA_BOOK_BEL || VISA_BOOK_PTR){
			wait(function(){
				const a = query("a[href].lets-get-started");
				
				if(a){
					setTimeout(function(){
						close();
					}, time("1.5s"));
					open(a.href, "_blank");
					return false;
				}

				return true;
			});
		}else if(VISA_BOOK_BRA){
			wait(function(){
				const a = query("all a[href][target='_blank']")[1];
				
				if(a){
					setTimeout(function(){
						close();
					}, time("1.5s"));
					a.click();
					return false;
				}

				return true;
			});
		}else{
			chrome.storage.local.get(["data", "PassportUsed", "ExtensionDelete"], PasteContentInVFSPage);
		}
	};
	const ExecuteActionForSpecifiedPage=url=>{
		const login = url.includes("/Account/RegisteredLogin");
		const index = url.includes("/Home/Index");
		const selectVAC = url.includes("/Home/SelectVAC");
		const addCustomer = url.includes("/Applicant/ApplicantList");
		const customer = url.includes("/Applicant/AddApplicant");
		const info1 = url.includes("/Service/Index");
		const calendar = url.includes("/Calendar/FinalCalendar");
		const info2 = url.includes("/Calendar/FinalConfirmation");
		const info3 = url.includes("/Payment");
		
		if(login){a();}else if(index){b();}else if(selectVAC){c(url);}else if(addCustomer){d();}else if(customer){e();}else if(info1){f();} else if(calendar){g();}else if(info2){h();}else if(info3){i();}
	};

	//setTimeout(()=>console.clear(), 500);
	chrome.storage.local.get(["data", "PassportUsed", "ExtensionDelete"], ({data: {data, category}})=>{
		if(!data || !category){
			throw new Error('Não pode executar a extensão em seu dispositivo.');
		}else{
			ClickToOpenBookingSite();
			ExecuteActionForSpecifiedPage(location.href);
		}
	});
})();
