//Listen for form submit
document.getElementById('myForm').addEventListener('submit', saveBookmark );

function saveBookmark(e) {
    e.preventDefault();

    var siteName = document.getElementById('siteName').value;
    var siteUrl = document.getElementById('siteUrl').value;

    var bookmark = {
        name: siteName,
        url: siteUrl
    }

    if(!validateInputs(siteName, siteUrl)){
        return false;
    }
    
    //Test if bookmarks is null
    if (localStorage.getItem('bookmarks') === null) {
        //Init array
        var bookmarks = [];
        //Add to array
        bookmarks.push(bookmark);
        //Set to localStorage (with turning array to string)
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    } else {
        //Get bookmarks from localStorage
         var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
         //Add bookmark to array
         bookmarks.push(bookmark);
         //Re-set array back to localStorage (with turning string to array)
         localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    };

    //re-fetch bookmarks, to refresh divs with data from localStorage
    fetchBookmarks();
    //Clear inputs by reseting form on submit
    this.reset();
}

//Delete bookmark
 function deleteBookmark(url) {
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    for (var x = 0; x < bookmarks.length; x++) {
        if (bookmarks[x].url == url) {
            //remove from array
            bookmarks.splice(x, 1);
        }
    }
    //upload new spliced array to localStorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    //re-fetch bookmarks, to refresh divs with data from localStorage
    fetchBookmarks();
};

//Fetch bookmarks
function fetchBookmarks() {
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    //Get output ID
    var bookmarksResults = document.getElementById('bookmarksResults');
    bookmarksResults.innerHTML = '';
    for (var i = 0; i < bookmarks.length; i++) {
        var name = bookmarks[i].name;
        var url = bookmarks[i].url;

        bookmarksResults.innerHTML += '<div class="well">' + 
                                      '<h3>' + name +
                                      '<a href="' + url + '", class="btn btn-xs btn-default" target="_blank">Visit</a> ' +
                                      '<a onclick="deleteBookmark(\'' + url + '\')" href="#", class="btn btn-xs btn-danger"">Delete</a> ' +
                                      '</h3>' +
                                      '</div>';
    }
}

//Form inputs VALIDATION
function validateInputs(siteName, siteUrl) {
    //Check both inputs for having values
    if (!siteName || !siteUrl) {
        alert('Please fill in all fields');
        return false;
    }

    //Starting URL validation
    //Creating URL regexp
    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regexurl = new RegExp(expression);
    //Checking siteUrl input for url, return false if not, preventing form from submit
    if (!siteUrl.match(regexurl)) {
        alert("Please enter valid URL");
        return false;
    }

    //Proceed form submitting if all if statements returned true
    return true
}