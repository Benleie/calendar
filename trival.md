

db.calendar.find({Open: 10789.72})

db.calendar.find({ Date: { $regex: /^2010-09-0/ }})













mongoimport --db test --collection calendar --authenticationDatabase test --username Arya --password 777 --drop --file ./data/dji.csv --type csv --headerline

mongoexport -d test -c inventory -u Arya -p 777  -o bad.csv --type csv -f item,qty,status,size.w

mongo  -u Ben --authenticationDatabase admin -p

db.auth("Arya","777")


不知归期的故人
只要平
听说

08:30  09:15  10:00 