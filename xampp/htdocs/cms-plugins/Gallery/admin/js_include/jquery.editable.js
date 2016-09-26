﻿(function($) {
/// <reference path="jquery.js" />

// *** wwEditable and jQuery plug-in code
// *** for now inline for debugging purposes        
function wwEditable(ctl,options) {
    var _I = this;
    var _Ctl = ctl;                
    if (typeof(ctl)=="string")
        _Ctl = jQuery("#" + ctl)[0];    
             	    
    // options
    this.callback = null;
    this.extraData = null;   
    this.textMode = "text";  // multiline
    this.maxLength = "";
    this.updatedColor = null;
    this.editClass = null;
    this.editMode = "text";  // "html","formatted"
    this.formattedLinks = true;  // [link,www.west-wind.com] format expansion as href links
    
    // operationals
    this.origHtml = null;    
    this.origText = null;
    this.enteredText = null;            
    this.jcol = jQuery(_Ctl);     
    this.jedit = null;
    _Ctl.wwEditable = true;
        
    if (options)
        jQuery.extend(this,options);
                   
    this.edit = function(callback)
    {        
        if (callback)
          _I.callback = callback;
          
        // *** Check if we're already editing and exit
        var jctl = jQuery("#__editColumn");
        if (jctl.length > 0)
            return;
                                
        _I.origHtml = _I.jcol.html();
            
        if (_I.editMode == "html")
           _I.origText = _I.origHtml;
        else if(_I.editMode == "formatted")
        {
            var txt = _I.origHtml.replace(/<br.*?>/gi,"#CRLF#");
            txt = $("<div>" + txt + "</div>").text().replace(/#CRLF#/g,"\r\n");  
            _I.origText = txt;      
        }
        else
            _I.origText = $.trim(_I.jcol.text());
        
        var maxl = '';
		if (_I.maxLength != '' && !isNaN(parseInt(_I.maxLength)))            
		{
			maxl = ' maxlength="'+_I.maxLength+'" ';
		}
            
        if (_I.textMode == "text")       
            _I.jcol.html("<" +"form action='javascript:void(0);'><input id='__editColumn' type='text' value='" + _I.origText + "' "+maxl+"/></form>");
        else
            _I.jcol.html("<" + "form action='javascript:void(0);'><textarea id='__editColumn'>" +  _I.origText + "</textarea></form>");        
       
       var jctl = $("#__editColumn");
       
       if (_I.textMode != "text")
       {
       		jctl.width( _I.jcol.width() - 4);
       		jctl.height(_I.jcol.height() - 4);
       }
              
       if (_I.editClass)
          jctl.addClass(_I.editClass); 
        
        // *** Select and focus the new input control
        var jctl = jQuery("#__editColumn");
        _I.jedit = jctl;        
        setTimeout( function() { jctl[0].focus() },50);

        jctl.keydown(_I._keyDownHandler);
        _I._bindBlur();
    }
    this.update = function(nomark) {           
        if (_I.jedit == null)
          return; 
        
        _I.jedit.remove();    
        _I.jedit = null;          
            
        if (_I.editMode == "formatted")        
           _I.enteredText = _I.enteredText.replace(/\n/g,"<br/>");
                 
        if (_I.origHtml.toLowerCase().substr(0,2) == "<a") {
            _I.jcol.html(_I.origHtml);            
            var c = _I.jcol.find("a");
            _I.jcol.find("a").text(_I.enteredText);
        }
        else
            _I.jcol.html(_I.enteredText);        
        
        if ( (!nomark && _I.updatedColor) || _I.origHtml.indexOf('__mark') > 0)
           _I.jcol.prepend("<div class='__mark' style='float: right; background:" + _I.updatedColor + ";height: 5px; width: 5px;'></div>");
                        
        _I.origHtml = _I.jcol.html();
    }
    this.abort = function()
    {    
        _I.jedit.remove();       
        _I.jedit == null;
        _I.jcol.html(_I.origHtml);                    
    }
    this.nextColumn = function(jcols)
    {
          if (!jcols)
            jcols = _I.jcol.find("~td");
            
          if (jcols.length>0)
          {
              for(var x=0;x<jcols.length;x++) {
                var jitem = jQuery(jcols[x]);
                if (jitem[0].wwEditable) {
                    jitem.trigger("click");
                    break;
                }
              }
          }
          else{                 
            var row = _I.jcol.parent().find("+tr");                    
            if (row.length > 0)
               _I.nextColumn(row.find(">td"));  
         }
    }
    this._updateHandler=function(event)
    {                                    
        _I.enteredText = _I.jedit.val();     
        var nomark = _I.enteredText==_I.origText;
        _I._bindBlur(true);
        var res = null;        
        if (_I.callback) {                               
           res = _I.callback(_I.enteredText,_I)
           if (res==false) _I.abort(); 
           if (res) _I.update(nomark);           
        }                 
        else _I.update(nomark);
        _I._bindBlur();                          
    }
    this._bindBlur = function(unbind)
    {
        if (!_I.jedit) return;
        if (unbind)
            _I.jedit.unbind("blur",_I._updateHandler);
        else
            _I.jedit.bind("blur",_I._updateHandler);
    }
    this._keyDownHandler = function(event)
    {                                             
        if (event.keyCode == 27)
            {_I.abort(); return;}
        if (event.keyCode == 13){ 
            if (_I.textMode!="multiline"){
                _I._updateHandler();
                _I.nextColumn();
                return false;
            } 
        }                      
        if (event.keyCode == 9 && event.shiftKey) {
            _I._updateHandler();                 
             var prev = _I.jcol[0].previousSibling;
             if (prev)
                   jQuery(prev).trigger("click");              
             return false;             
        }
        if (event.keyCode == 9) {            
            _I._updateHandler();
            _I.nextColumn()
            return false;                                                                                                       
        }    
    }
}

// jQuery selector function extensions
jQuery.fn.makeEditable = function(options)
{            
    if (this.length < 0)
       return this;
       
    this.each( function(index) {          
        var jitem = jQuery(this);               
        this.wwEditable = true;
        jitem.click(function(event) { new wwEditable( this,options).edit(); return true; } );                    
    } );    
    return this;
}
jQuery.fn.makeTableEditable = function(options)
{        
    if (this.length < 1)
       return this;               
    this.find("td").makeEditable(options);                
    return this;        
}
})(jQuery);