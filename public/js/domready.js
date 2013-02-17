$(function(){
  var $results = $('#results');
  var $exec = $('#exec');

  var editor = ace.edit("editor");
  editor.setTheme("ace/theme/monokai");
  editor.getSession().setMode("ace/mode/sql");

  
  $exec.click(function(){
    $.ajax({
      url: '/table'
    , type: 'POST'
    , data: { command: editor.getValue() }
    , success: function(data){
      console.log(data.indexOf('<table'));
        if (data.substring(0, 6) !== '<table') data = "<pre>" + data + "</pre>";
        $results.html(data);
      }
    });
  });

});