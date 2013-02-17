var
  child     = require('child_process')
, database  = process.argv[2] || 'goodybag'
;

exports.index = function(req, res){
  res.render('index');
};

exports.getTable = function(req, res){
  var args = ['-h', 'localhost', '-H', '-d', database];

  if (req.body.command.indexOf("\\") === -1) req.body.command += ";";

  args.push('--command=' + req.body.command.replace(/\"/g, "\""));


  var psql = child.spawn('psql', args);
  psql.stdout.on('data', function (data) {
    data = data.toString();
    if (data.indexOf('<table') > -1){
      data = data.replace('<table border="1">', '<table class="table table-bordered table-striped">')
    }
    res.end(data);
    psql.stdout.destroy();
  });
  psql.stderr.on('data', function(data){
    res.end(data.toString());
    psql.stdout.destroy();
  });
};