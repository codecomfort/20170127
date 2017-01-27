// 参考
// [React Native Basics: How to Use the ListView Component – Differential – Medium](https://medium.com/differential/react-native-basics-how-to-use-the-listview-component-a0ec44cf1fe8#.tqz2mgy32)
class Sample {
  formatData(data) {
    // We're sorting by alphabetically so we need the alphabet
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

    // Need somewhere to store our data
    const dataBlob = {};
    const sectionIds = [];
    const rowIds = [];

    // Each section is going to represent a letter in the alphabet so we loop over the alphabet
    for (let sectionId = 0; sectionId < alphabet.length; sectionId++) {
      // Get the character we're currently looking for
      const currentChar = alphabet[sectionId];

      // Get users whose first name starts with the current letter
      const users = data.filter((user) => user.name.first.toUpperCase().indexOf(currentChar) === 0);

      // If there are any users who have a first name starting with the current letter then we'll
      // add a new section otherwise we just skip over it
      if (users.length > 0) {
        // Add a section id to our array so the listview knows that we've got a new section
        sectionIds.push(sectionId);

        // Store any data we would want to display in the section header. In our case we want to show
        // the current character
        dataBlob[sectionId] = { character: currentChar };

        // Setup a new array that we can store the row ids for this section
        rowIds.push([]);

        // Loop over the valid users for this section
        for (let i = 0; i < users.length; i++) {
          // Create a unique row id for the data blob that the listview can use for reference
          const rowId = `${sectionId}:${i}`;

          // Push the row id to the row ids array. This is what listview will reference to pull
          // data from our data blob
          rowIds[rowIds.length - 1].push(rowId);

          // Store the data we care about for this row
          dataBlob[rowId] = users[i];
        }
      }
    }

    return { dataBlob, sectionIds, rowIds };
  }

  execute() {
    let { dataBlob, sectionIds, rowIds } = this.formatData([
      {
        "gender": "male",
        "name": {
          "title": "mr",
          "first": "aiden",
          "last": "lucas"
        },
        "location": {
          "street": "1446 oak lawn ave",
          "city": "lakewood",
          "state": "arizona",
          "postcode": 60649
        },
        "email": "aiden.lucas@example.com",
        "login": {
          "username": "smallostrich903",
          "password": "kristine",
          "salt": "r5u9JFIh",
          "md5": "0e2f37c4b8baafacd62562857e9ecda5",
          "sha1": "e39a1487902ecc6d54287080c26794504348a4de",
          "sha256": "96220812c203891d9e7fc287e5fa73275ac8159d277ea088b051e80ec43abc99"
        },
        "registered": 1056249168,
        "dob": 1216516975,
        "phone": "(661)-131-8187",
        "cell": "(408)-707-4720",
        "id": {
          "name": "SSN",
          "value": "294-55-5909"
        },
        "picture": {
          "large": "https://randomuser.me/api/portraits/men/4.jpg",
          "medium": "https://randomuser.me/api/portraits/med/men/4.jpg",
          "thumbnail": "https://randomuser.me/api/portraits/thumb/men/4.jpg"
        },
        "nat": "US"
      }
    ]);

    console.log(dataBlob);
    /*
     { '0': { character: 'A' },
     '0:0':
     { gender: 'male',
     name: { title: 'mr', first: 'aiden', last: 'lucas' },
     location:
     { street: '1446 oak lawn ave',
     city: 'lakewood',
     state: 'arizona',
     postcode: 60649 },
     email: 'aiden.lucas@example.com',
     login:
     { username: 'smallostrich903',
     password: 'kristine',
     salt: 'r5u9JFIh',
     md5: '0e2f37c4b8baafacd62562857e9ecda5',
     sha1: 'e39a1487902ecc6d54287080c26794504348a4de',
     sha256: '96220812c203891d9e7fc287e5fa73275ac8159d277ea088b051e80ec43abc99' },
     registered: 1056249168,
     dob: 1216516975,
     phone: '(661)-131-8187',
     cell: '(408)-707-4720',
     id: { name: 'SSN', value: '294-55-5909' },
     picture:
     { large: 'https://randomuser.me/api/portraits/men/4.jpg',
     medium: 'https://randomuser.me/api/portraits/med/men/4.jpg',
     thumbnail: 'https://randomuser.me/api/portraits/thumb/men/4.jpg' },
     nat: 'US' } }
     */
    console.log(sectionIds);
    /*
     [ 0 ]
    */
    console.log(rowIds);
    /*
     [ [ '0:0' ] ]
    */
  }
}

new Sample().execute();
// コンソールから node test1.js で実行
// または、Atom Runner でもいい
