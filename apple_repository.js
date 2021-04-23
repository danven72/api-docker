const Apple = require('./apple');

function AppleRepository() {
    let appleList = [new Apple(1, 'golden', 'yellow'), new Apple(2, 'delicious', 'yellow'), new Apple(3, 'fuji', 'red')];

    this.findAppleById = function(id) {
        return appleList.find(a => a.id === parseInt(id));
    }

    this.addApple = function(apple) {
        apple.id = calculateNewId();
        appleList.push(apple);

        return apple;
    }

    function calculateNewId() {
        return appleList[appleList.length -1].id + 1;
    }

    this.deleteAppleById = function(id) {
        let deleted = false;
        for(let i=0; i< appleList.length; i++) {
            if (appleList[i].id == id) {
                console.log('found!');
                appleList.splice(i, 1);            
                deleted = true;
            }
        }
        return deleted;    
    };

    this.updateApple = function(apple) {
        let updated = null;
        
        for(let i=0; i< appleList.length; i++) {
            if (appleList[i].id == apple.id) {
                console.log('found!');
                if(apple.name) {
                    appleList[i].name = apple.name;
                }
                if (apple.color) {
                    appleList[i].color = apple.color;
                }
                updated = appleList[i];
            }
        }
        return updated;            
    }

    Object.defineProperty(this, 'appleList', {
        get: function() {
            return appleList;
        }
    });
}

module.exports = AppleRepository;
