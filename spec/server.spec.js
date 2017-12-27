var request = require('request')

describe('Get Messages', ()=>{
    it('Should return 200 OK', (done)=>{
        request.get('http://localhost:5001/messages', (err, response)=>{
            console.log(response.statusCode)
            expect(response.statusCode).toBe(200)
            done()
        })
    })

    it('Should return non-empty list', (done)=>{
        request.get('http://localhost:5001/messages', (err, response)=>{
            console.log(response.body)
            expect(response.body.length).toBeGreaterThan(0)
            done()
        })
    })
})