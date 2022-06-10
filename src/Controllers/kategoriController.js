async function insert(req,res,next){
    res.send('user ');
}

async function update(req,res,next){
    res.send('user update');

}

async function getAll(req,res,next){
    res.send('user get all');
}

async function getOne(req,res,next){
    res.send('user getone');
}

async function destroy(req,res,next){
    res.send('user getDestroy');
}

module.exports={insert,update,destroy,getAll,getOne};