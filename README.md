dearborn
==========
해당 폴더는 이전에 했던 프로젝트의 백엔드를 장고에서 nodejs와 mongodb를 통해 구현했다.
Link: [Dearborn][dearbornlink]
[dearbornlink]: https://github.com/VIXXPARK/dearborn
벨로퍼트의 블로그를 통해 jwt토큰 생성과 로그인을 구현하였다.
coursera 강의 중 nodejs에 대한 강의를 들었는데 여기에서 전체적인 흐름에 대하여 파악했다.
가장 기억 남는 부분
```javascript
exports.getPost = (req,res)=>{
    Post.find({})
    .populate("user") //join과 비슷한 역할 
    .sort({"createdAt":-1})
    .exec((err,results)=>{
        if(err) return res.status(400).send(err);
        let limit = parseInt(req.query.limit);
        let offset = parseInt(req.query.offset);
        if(limit>results.length-offset){
            limit=results.length-offset
        }
        res.json({
            success:true,
            "post": results.slice(offset,offset+limit),
            "Nextoffset":offset+limit
        })
    })
}
```
mongodb의 가장 편한점은 테이블 간의 관계를 깊게 생각하지 않아도 된다는 점이 정말 좋았던 것 같다.
단순히 .populate(table)



sqlServer
=========
해당 폴더 또한 이전에 했던 dearborn 프로젝트 기본 틀을 토대로 mongodb가 아닌 mysql을 통해 구현
sequelize를 통해 orm 형식으로 작성하는 것을 연습. 이부분에서 장고하고 비슷해서 이해하기 쉬웠다.

multer 사용
```javascript
const upload = multer({
    storage: multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, 'public/images');
      },
      // filename: function (req, file, cb) {
      //   cb(null, new Date().valueOf() + path.extname(file.originalname));
      // }
    }),
    dest:'public/images'
  });


router.post('/uploadPost',upload.fields([{name:'images',maxCount:20},{name:'thumbnail',maxCount:1}]),authMiddleware,controller.uploadPost)
router.get('/getPost',express.static('public/images'),controller.getPost)
```

uploadPost 구현
```javascript
exports.uploadPost = (req,res,next)=>{
    imagePath=[];
    for(idx in req.files['images']){
        var x={image:req.files['images'][idx].path}
        imagePath.push(x)
    }
    models.Post.create({
        title:req.body.title,
        content:req.body.content,
        thumbnail:req.files['thumbnail'][0].path,
        userId:req.decoded.id,
        images:Object.values(imagePath),
        createdAt:new Date().getTime(),
        updatedAt:new Date().getTime()

    },{
        include:[models.Image]
    })
    .then(result=>{
        res.json({
            success:true,
            result
        })
    }).catch(err=>{
        res.status(400).send({success:false})
    })
}
```
여기에서 가장 오래걸렸던 부분은 복수 개의 이미지를 전달하는 방식에서 애를 먹었다.
위의 방법이 꼼수인지 아닌지는 모르겠지만 
```javascript
    imagePath=[];
        for(idx in req.files['images']){
            var x={image:req.files['images'][idx].path}
            imagePath.push(x)
        }   
```
위와 같이 files에 있는 여러개의 images의 파일들의 경로들을 imagePath에 저장
그리고 나머지는 일반 생성과 유사하다.

