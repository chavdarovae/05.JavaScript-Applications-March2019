function solution() {
    const baseUrl = 'https://baas.kinvey.com';
    const appKey = 'kid_BJXTsSi-e';
    let username = 'guest';
    let password = 'guest';
    const headers = {
        'Authorization': `Basic ${btoa(username + ':' + password)}`,
        'Content-Type': 'application/json'
    }
    const collection = 'Students';

    $('.add').on('click', addNewStudent);
    listStudents();

    async function listStudents() {
        $('table tbody').empty();
        $('table tbody').append(`<tr><th>ID</th><th>First Name</th><th>Last Name</th><th>Faculty Number</th><th>Grade</th</tr>`);

        let url = `${baseUrl}/appdata/${appKey}/${collection}`;
        let students = await $.ajax({
            url,
            headers,
            method: "GET",
        });
        try {
            students = students.filter(x => x.ID);
            students.sort((a, b) => a.ID - b.ID);

            for (let student of students) {
                let $row = $(`
                                <tr id="${student._id}">
                                    <td>${student.ID}</td>
                                    <td>${student.FirstName}</td>
                                    <td>${student.LastName}</td>
                                    <td>${student.FacultyNumber}</td>
                                    <td>${student.Grade}</td>
                                </tr>
                            `);

                $('table tbody').append($row);
            }
        } catch (error) {
            console.error("Something went wrong" + error);
        }
    };

    async function addNewStudent() {
        let url = `${baseUrl}/appdata/${appKey}/${collection}`;
        let studentObj = {
            'ID': Number($('#ID').val()),
            'FirstName': $('#FirstName').val(),
            'LastName': $('#LastName').val(),
            'FacultyNumber': Number($('#FacultyNumber').val()),
            'Grade': Number($('#Grade').val()),
        }
        await $.ajax({
            url,
            headers,
            method: "POST",
            data: JSON.stringify(studentObj)
        });
        try {
            $('#newStudent input').val('');
            listStudents();
        } catch (error) {
            console.error("Something went wrong" + error);
        }
    }
}


