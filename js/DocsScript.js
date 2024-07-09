
import overviewJson from '../jsonDocs/overview.json' assert {type:"json"}
import authJson from '../jsonDocs/auth.json' assert {type:"json"}
import tracksJson from '../jsonDocs/tracks.json' assert {type:"json"}
import lecturesJson from '../jsonDocs/lectures.json' assert {type:"json"}
import attendanceJson from '../jsonDocs/attendance.json' assert {type:"json"}
import todoJson from '../jsonDocs/todo.json' assert {type:"json"}
import settingsJson from '../jsonDocs/setting.json' assert {type:"json"}
import adminAuthJson from '../jsonDocs/admin_auth.json' assert {type:"json"}
import adminTracksJson from '../jsonDocs/admin-tracks.json' assert {type:"json"}
import adminLecturesJson from '../jsonDocs/admin-lectures.json' assert {type:"json"}
import adminAttendancesJson from '../jsonDocs/admin-attendace.json' assert {type:"json"}
import adminFinancialsJson from '../jsonDocs/admin-financials.json' assert {type:"json"}
import superAdminJson from '../jsonDocs/Super-admin.json' assert {type:"json"}
import FilesJson from '../jsonDocs/Files.json' assert {type:"json"}

const jsonData = [
    ...overviewJson,
    ...authJson,
    ...tracksJson,
    ...lecturesJson,
    ...attendanceJson,
    ...todoJson,
    ...settingsJson,
    ...adminAuthJson,
    ...adminTracksJson,
    ...adminLecturesJson,
    ...adminAttendancesJson,
    ...adminFinancialsJson,
    ...superAdminJson,
    ...FilesJson
]

Object.prototype.prettyPrint = function(){
    var jsonLine = /^( *)("[\w]+": )?("[^"]*"|[\w.+-]*)?([,[{])?$/mg;
    var replacer = function(match, pIndent, pKey, pVal, pEnd) {
        var key = '<span class="json-key" style="color: #4fdee5 ">',
            val = '<span class="json-value" style="color: #f5b041 ">',
            str = '<span class="json-string" style="color: #15e16c">',
            r = pIndent || '';
        if (pKey)
            r = r + key + pKey.replace(/[": ]/g, '') + '</span>: ';
        if (pVal)
            r = r + (pVal[0] == '"' ? str : val) + pVal + '</span>';
        return r + (pEnd || '');
    };

    return JSON.stringify(this, null, 3)
               .replace(/&/g, '&amp;').replace(/\\"/g, '&quot;')
               .replace(/</g, '&lt;').replace(/>/g, '&gt;')
               .replace(jsonLine, replacer);
}


for(var i =0;i<jsonData.length;i++){
    var item = jsonData[i]
    var id = item.endpoint.replace('/','').toLowerCase()
    var color = ''
    if (item.method.toLowerCase() == "get"){
        color ='colorBlue'
    }else if (item.method.toLowerCase() == "post"){
        color ='colorGreen'
    }else if (item.method.toLowerCase() == "delete"){
        color ='colorRed'
    }else if (item.method.toLowerCase() == "put"){
        color ='colorYellow'
    }
    var ListhtmlBuild = '&ensp;&ensp;<a href="#'+item.method.toLowerCase()+id+'"><code class="higlighted">'+item.endpoint.toLowerCase()+'</code> <span>'+item.method.toUpperCase()+'</span></a>'
    var htmlBuild = '<div id="'+item.method.toLowerCase()+id+'" class = "singleEndpoint">\
                    <h3>'+item.endpoint.toLowerCase()+' <span class="methodType '+color+'">'+item.method.toUpperCase()+'</span></h3>\
                    <p>'+item.description+'</p>'
    if (item['parameters'] != undefined){
        htmlBuild+='<h4>Parameters:</h4>\
        <table>\
        <thead>\
        <tr>\
            <th>Parmeters</th>\
            <th>Type</th>\
            <th>Description</th>\
        </tr>\
        </thead>\
        <tbody>'
        for(var tr =0;tr<item.parameters.length;tr++){
            htmlBuild+= '<tr> <td>'+item.parameters[tr].paramName+'</td><td>'+item.parameters[tr].paramType+'</td><td>'+item.parameters[tr].paramDescription+'</td></tr>'
        }
    }

    htmlBuild+='</tbody></table><h4>Response:</h4><p>'+item.responseDescription+'</p>'
    if (item['responseParameters'] != undefined){
        htmlBuild+='<h4>Response Parameters:</h4>\
        <table>\
        <thead>\
        <tr>\
            <th>Parmeters</th>\
            <th>Type</th>\
            <th>Description</th>\
        </tr>\
        </thead>\
        <tbody>'
        for(var tr =0;tr<item.responseParameters.length;tr++){
            htmlBuild+= '<tr> <td>'+item.responseParameters[tr].paramName+'</td><td>'+item.responseParameters[tr].paramType+'</td><td>'+item.responseParameters[tr].paramDescription+'</td></tr>'
        }
        htmlBuild+='</tbody></table>'
    }
    
    if (item.requestExample !=null){
        htmlBuild+= '<h4>Request Json Example:</h4><div class="CodeArea">\
        <pre><code class="json">'+item.requestExample.prettyPrint()+'</code></pre></div>'
    }           
    if (item.responseExample !=null){
        htmlBuild+= '<h4>Response Example:</h4><div class="CodeArea">\
        <pre><code class="json">'+item.responseExample.prettyPrint()+'</code></pre></div>'
    }
    htmlBuild+='</div><hr/>'

    const targetSection = item.section
    $("#"+targetSection+"EndpointsDetails").append(htmlBuild)
    $("#"+targetSection+"EndpointsList").append(ListhtmlBuild)


}
$("#show_leftMenu_buttom").click(()=>{
    if ($(".left-menu").width() == 0){
        $(".left-menu").width(300)
        $("#show_leftMenu_buttom").text("<")
    }else{
        $(".left-menu").width(0)
        $("#show_leftMenu_buttom").text(">")
    }
})


