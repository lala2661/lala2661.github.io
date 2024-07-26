
fetch("weird.json")
        .then((response) => response.json())
        .then((data) => {
            let columns = document.getElementsByClassName("column");
            for(item in data.messages){
                let newMessage = document.createElement('div');
                newMessage.classList.add("note");
                columns[item%3].appendChild(newMessage);
            }
            let notes = document.getElementsByClassName("note");
            console.log(notes);
                
            let col = 0;
            while(col < 3){
                
                let item = 0;
                console.log("col " + col);
                console.log(columns[col].getElementsByClassName("note").length);
                for(let x = 0; x < (columns[col].getElementsByClassName("note").length); x++){
                    item = x * 3 + col;
                    console.log(item);
                    let noteText = document.createElement('p');
                    noteText.innerHTML = data.messages[item].date + "<br>" + data.messages[item].desc;
                    columns[col].getElementsByClassName("note")[x].appendChild(noteText);
                }
                col++;


            }


        });




