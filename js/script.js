$(document).ready(function() {
    
    // Password Toggle
    function setupToggle(iconId, inputId) {
        $(`#${iconId}`).on('click', function() {
            const input = $(`#${inputId}`);
            const type = input.attr('type') === 'password' ? 'text' : 'password';
            input.attr('type', type);
            $(this).toggleClass('fa-eye-slash fa-eye');
        });
    }
    setupToggle('toggleLoginPass', 'userPass');
    setupToggle('toggleRegPass', 'regPass');

    // LocalStorage Functions
    function loadUsers() {
        const users = JSON.parse(localStorage.getItem('najiUsers')) || [];
        if ($('#userList').length) {
            $('#userList').empty();
            users.forEach((user, index) => {
                const entry = `
                    <div class="list-item">
                        <div style="font-size: 13px;">
                            <b>${user.name}</b> (@${user.user})<br>
                            No: ${user.contact} | Age: ${user.age}
                        </div>
                        <button class="del-btn" onclick="deleteUser(${index})">Delete</button>
                    </div>`;
                $('#userList').prepend(entry);
            });
            $('#userCount').text(users.length);
        }
    }

    window.deleteUser = function(index) {
        let users = JSON.parse(localStorage.getItem('najiUsers')) || [];
        users.splice(index, 1);
        localStorage.setItem('najiUsers', JSON.stringify(users));
        loadUsers();
    };

    // Register Logic
    $('#registerBtn').on('click', function() {
        const newUser = {
            name: $('#regName').val(),
            user: $('#regUser').val(),
            pass: $('#regPass').val(),
            contact: $('#regContact').val(),
            age: $('#regAge').val(),
            birth: $('#regBirth').val()
        };

        if (Object.values(newUser).some(v => v === "")) {
            Swal.fire({ icon: "error", title: "Oops...", text: "Don't leave fields blank!" });
        } else {
            let users = JSON.parse(localStorage.getItem('najiUsers')) || [];
            users.push(newUser);
            localStorage.setItem('najiUsers', JSON.stringify(users));
            Swal.fire({ title: "Drag me!", icon: "success", draggable: true });
            loadUsers();
            $('input').val('');
        }
    });

    // Login Logic
    $('#loginBtn').on('click', function() {
        const email = $('#userEmail').val();
        const pass = $('#userPass').val();
        if(!email || !pass) {
            Swal.fire({ icon: "error", title: "Oops...", text: "Something went wrong!" });
        } else {
            Swal.fire({ title: "Log in Success!", icon: "success" }).then(() => {
                window.location.href = "index.html";
            });
        }
    });

    // Initial Load & Exit
    loadUsers();
    $('.exit-link').on('click', function() { window.location.href = "index.html"; });

    // Search
    $('#searchBar').on('keyup', function() {
        var value = $(this).val().toLowerCase();
        $(".list-item").filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
        });
    });
});