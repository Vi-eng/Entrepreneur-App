
var mentorurl = 'http://localhost:3000/Mentors';
var entreurl = 'http://localhost:3000/Funds';
var entallapp = 'http://localhost:3000/allFunds';
var allloan = 'http://localhost:3000/allloans';
var allment = 'http://localhost:3000/allmentapp';

async function getfromurl(geturl) {
    let url = geturl;
    try {
        let res = await fetch(url, {
            method: 'GET'
        });
        console.log(res);
        return await res.json();
    } catch (error) {
        console.log(error);
    }
};

async function fetchData(the_url) {
    try {
      var returned_data = await getfromurl(the_url); // Await the resolved array
      console.log(returned_data); // Access the assigned value
      return returned_data;
    } catch (error) {
      console.log(error); // Handle any errors
    }
  };

export async function entredash(){
    var tablevalues = await fetchData(entreurl);
    var TableData = ``;
    Array.prototype.forEach.call(tablevalues, (value) => {
        console.log(value);
        var Status = 'Pending';
        if(value.Approved == 'A'){
            Status = 'Approved';
        }else if(value.Approved == 'C'){
            Status = 'Cancelled';
        };
        TableData += `<tr><td>${value.BusinessName}</td><td>${value.BusinessSector}</td><td>${value.RequestedFunds}</td><td class = 'status'>${Status}</td><td> <form action = '/Cancel' method = 'POST'> <input style = 'display : none' name = 'fundid' value = ${value.fundid}><button class = 'gm-but-des cancelbutton' type = 'submit' >Cancel</button></form></td></tr>`;
    });
    console.log(TableData);
    return TableData;
  };
  
  export async function investdash(){
    var tablevalues = await fetchData(entallapp);
    var TableData = ``;
    Array.prototype.forEach.call(tablevalues, (value) => {
        console.log(value);
        if(value.Approved === null || value.Approved.length == 0){
        TableData += `<tr><td>${value.BusinessName}</td><td>${value.RequestedFunds}</td><td><a href="/investmore"><button type="submit" class="brq-submit" > Click to view</button></a></td></tr>`;
    }else if(value.Approved == 'A'){
        TableData += `<tr><td>${value.BusinessName}</td><td>${value.RequestedFunds}</td><td>Funding</td></tr>`; 
    }
    });
    console.log(TableData);
    return TableData;
  };
  
  
export async function investmore(){
    var tablevalues = await fetchData(entallapp);
    var TableData = ``;
    Array.prototype.forEach.call(tablevalues, (value) => {
        if(value.Approved == 'A' || value.Approved == 'C'){
        console.log(value);
        }else{
        TableData +=      `<tr>
                            <td class="amr-td">
                            <div class="dropdwn1">
                                    <h4 class="cmr-txt">${value.BusinessName}</h4>
                                    <div class="dropdown-content">
                                        <a href="#" class="bio">${value.BusinessIdeaDes}
                                        </a>
                                     </div>
                             </div>
                            </td>
                            <td class="amr-td">${value.RequestedFunds}</td>
                            <td>
                            <form action = '/notInvest' method = 'POST'>
                                <input style = 'display : none;' name = 'fundid' value = ${value.fundid} >
                            <button type="submit" class="orange-back brq-submit"> cancel</button>
                            </form>
                            </td>
                            <td>
                            <form action = '/Invest' method = 'POST'>
                                <input style = 'display : none;' name = 'fundid' value = ${value.fundid} >
                            <button type="submit" class="brq-submit"> submit</button>
                            </form>
                            </td>
                            </tr>`;
        };
    });
    console.log(TableData);
    return TableData;
  };

  export async function investport(){
    var tablevalues = await fetchData(entallapp);
    var TableData = ``;
    Array.prototype.forEach.call(tablevalues, (value) => {
        if(value.Approved == 'A'){        
        TableData +=      `<tr>
                            <td class="amr-td">
                            <div class="dropdwn1">
                                    <h4 class="cmr-txt">${value.BusinessName}</h4>
                                    <div class="dropdown-content">
                                        <a href="#" class="bio">${value.BusinessIdeaDes}
                                        </a>
                                     </div>
                             </div>
                            </td>
                            <td class="amr-td">${value.RequestedFunds}</td>
                            <td class="amr-td">${value.RequestedFunds}</td>
                            <td class="amr-td">${value.BusinessTerms}</td>
                            </tr>`;
        };
    });
    console.log(TableData);
    return TableData;
  };

  export async function admindash2(){
    var tablevalues = await fetchData(entallapp);
    var TableData = ``;
    Array.prototype.forEach.call(tablevalues, (value) => {
        TableData +=      `<tr>
        <td class="amr-td">${value.BusinessName}</td>
        <td class="amr-td">${value.RequestedFunds}</td>
        <td class="amr-td">Funds</td>
        <td>
                    <a href="/EAdmin">
                            <button type="submit" class="brq-submit" > Click to view</button> 
                    </a>
             </td>
    </tr>`;
    });
    console.log(TableData);
    return TableData;
  };

  
  export async function admindash1(){
    var tablevalues = await fetchData(allloan);
    var TableData = ``;
    Array.prototype.forEach.call(tablevalues, (value) => {
        TableData +=        `<tr>
        <td class="amr-td">${value.BusinessName}</td>
        <td class="amr-td">${value.RequestedFunds}</td>
        <td class="amr-td">Loans</td>
        <td>
                    <a href="/EAdmin">
                            <button type="submit" class="brq-submit" > Click to view</button> 
                    </a>
             </td>
    </tr>`;
    });
    console.log(TableData);
    return TableData;
  };

  export async function adminen1(){
    var tablevalues = await fetchData(entallapp);
    var TableData = ``;
    Array.prototype.forEach.call(tablevalues, (value) => {
    var Cancel = 'Cancel';
    var Status = 'Pending';
        if(value.Approved == 'A'){
            Status = 'Approved';
        }else if(value.Approved == 'C'){
            Status = 'Cancelled';
            Cancel = 'Cancelled';
        };
        TableData +=        `<tr>
        <td class="amr-td">
                <div class="dropdwn1" >
                        <h4 class="cmr-txt">${value.BusinessName}</h4>
                                <div class="dropdown-content">
                                        <a href="#" class="bio">${value.BusinessIdeaDes}
                                        </a>
                                </div>
                        </div>
        </td>
        <td class="amr-td">${value.RequestedFunds}</td>
        <td>${Status}</td>
        <td>
        <form action = '/notInvest' method = 'POST'>
        <input style = 'display : none;' name = 'fundid' value = ${value.fundid} >
        <button type="submit" class="brq-submit orange-back" id = 'cancel'> ${Cancel} </button>
        </form>
        </td>
        </tr>`;
    });
    console.log(TableData);
    return TableData;
  };

  
  export async function adminen2(){
    var tablevalues = await fetchData(allloan);
    var TableData = ``;
    Array.prototype.forEach.call(tablevalues, (value) => {
    var Cancel = 'Cancel';
    var Status = '';
        if(value.Approved == 'A'){
            Status = 'Approved';
        }else if(value.Approved == 'C'){
            Status = 'Cancelled';
            Cancel = 'Cancelled';
        };
        if(Status == ''){
            Status = `<form action = '/apprloan' method = 'POST'>
        <input style = 'display : none;' name = 'fundid' value = ${value.fundid} >
        <button type="submit" class="brq-submit" id = 'cancel'> Approve </button>
        </form>`
    };
        TableData +=        `<tr>
        <td class="amr-td">
                <div class="dropdwn1" >
                        <h4 class="cmr-txt">${value.BusinessName}</h4>
                                <div class="dropdown-content">
                                        <a href="#" class="bio">${value.BusinessIdeaDes}
                                        </a>
                                </div>
                        </div>
        </td>
        <td class="amr-td">${value.RequestedFunds}</td>
        <td>${Status}</td>
        <td>
        <form action = '/notLoan' method = 'POST'>
        <input style = 'display : none;' name = 'fundid' value = ${value.fundid} >
        <button type="submit" class="brq-submit orange-back" id = 'cancel'> ${Cancel} </button>
        </form>
        </td>
        </tr>`;
    });
    console.log(TableData);
    return TableData;
  };


  export async function adminmentdash(){
    var tablevalues = await fetchData(allment);
    var TableData = ``;
    Array.prototype.forEach.call(tablevalues, (value) => {
        TableData +=        `<tr>
        <td class="amr-td">${value.BusinessName}</td>
        <td class="amr-td">${value.BusinessSector}</td>
        <td class="amr-td">${value.AppliedBefore}</td>
        <td>
                    <a href="/MAdmin">
                            <button type="submit" class="brq-submit" > Click to view</button> 
                    </a>
             </td>
    </tr>`;
    });
    console.log(TableData);
    return TableData;
  };



  //BusinessName, BusinessSector, AppliedBefore, MGender, MentorID, EntreID

  /*
                                                             
                                                                
                                                                <div class="pop-up" id="popup"> <!--*code for submit pop-up modal-->
                                                                        <img src="images/icons/tick.png" alt="tick-img" class="tick-img">
                                                                        <h2>Thank you!</h2>
                                                                        <p class="fnt">Your Interest has been submitted</p>
                                                                        <button type="submit" class="inn-but" onclick="closePopup()"> ok </button>
                                                                </div>
                                                                */

                                                        