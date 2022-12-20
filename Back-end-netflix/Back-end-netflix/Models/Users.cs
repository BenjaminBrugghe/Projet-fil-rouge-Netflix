using Back_end_netflix.Tools;
using System.Data.SqlClient;

namespace Back_end_netflix.Models
{
    public class Users
    {
        #region Attributs

        private int id;
        private string lastname;
        private string firstname;
        private string email;
        private string password;
        private int admin;
        private int banned;
        private string token;

        static string _request;
        static SqlCommand _command;
        static SqlConnection _connection;
        static SqlDataReader _reader;

        #endregion

        #region Constructors
        public Users()
        {

        }

        public Users(string lastname, string firstname, string email, string password, int admin, int banned, string token)
        {
            Lastname = lastname;
            Firstname = firstname;
            Email = email;
            Password = password;
            Admin = admin;
            Banned = banned;
            Token = token;
        }
        #endregion

        #region Propriétés
        public int Id { get => id; set => id = value; }
        public string Lastname { get => lastname; set => lastname = value; }
        public string Firstname { get => firstname; set => firstname = value; }
        public string Email { get => email; set => email = value; }
        public string Password { get => password; set => password = value; }
        public int Admin { get => admin; set => admin = value; }
        public int Banned { get => banned; set => banned = value; }
        public string Token { get => token; set => token = value; }
        #endregion

        public static List<Users> GetAllUsers()
        {
            List<Users> userList = new List<Users>();

            SqlConnection connection = Connection.New;

            string request = "SELECT * FROM USERS";

            SqlCommand command = new SqlCommand(request, connection);

            connection.Open();

            SqlDataReader reader = command.ExecuteReader();

            while (reader.Read())
            {
                Users user = new Users()
                {
                    Id = reader.GetInt32(0),
                    Lastname = reader.GetString(1),
                    Firstname = reader.GetString(2),
                    Email = reader.GetString(3),
                    Password = reader.GetString(4),
                    Admin = reader.GetInt32(5),
                    Banned = reader.GetInt32(6),
                    Token = reader.GetString(7)
                };
                userList.Add(user);
            }
            reader.Close();

            command.Dispose();

            connection.Close();

            return userList;
        }

        //public static Users GetUserByToken()
        //{
        //    Users currentUser = new();

        //    _connection = Connection.New;

        //    _request = "SELECT * FROM USERS WHERE token = @Token";

        //    _command = new SqlCommand(_request, _connection);

        //    _connection.Open();


        //    return currentUser;
        //}

        public int CreateUser()
        {
            _connection = Connection.New;

            _request = "INSERT INTO USERS (lastname, firstname, email, password, admin, banned, token) " +
                "OUTPUT INSERTED.ID VALUES (@lastname, @firstname, @email, @password, @admin, @banned, @token)";

            _command = new SqlCommand(_request, _connection);

            _command.Parameters.Add(new SqlParameter("@lastname", Lastname));
            _command.Parameters.Add(new SqlParameter("@firstname", Firstname));
            _command.Parameters.Add(new SqlParameter("@email", Email));
            _command.Parameters.Add(new SqlParameter("@password", Password));
            _command.Parameters.Add(new SqlParameter("@admin", Admin));
            _command.Parameters.Add(new SqlParameter("@banned", Banned));
            _command.Parameters.Add(new SqlParameter("@token", Token));

            _connection.Open();

            int newUser = (int)_command.ExecuteScalar();

            _command.Dispose();

            _connection.Close();

            return newUser;
        }

        public bool EditUser()
        {
            _connection = Connection.New;

            _request = "UPDATE USERS SET lastname = @lastname, firstname = @firstname, email = @email, password = @password, admin = @admin, banned = @banned, token = @token WHERE id = @Id";

            _command = new SqlCommand(_request, _connection);

            _command.Parameters.Add(new SqlParameter("@id", Id));
            _command.Parameters.Add(new SqlParameter("@lastname", Lastname));
            _command.Parameters.Add(new SqlParameter("@firstname", Firstname));
            _command.Parameters.Add(new SqlParameter("@email", Email));
            _command.Parameters.Add(new SqlParameter("@password", Password));
            _command.Parameters.Add(new SqlParameter("@admin", Admin));
            _command.Parameters.Add(new SqlParameter("@banned", Banned));
            _command.Parameters.Add(new SqlParameter("@token", Token));

            _connection.Open();

            int nbLignes = _command.ExecuteNonQuery();

            _command.Dispose();

            _connection.Close();

            return nbLignes > 0;
        }

        public bool DeleteUser()
        {
            _connection = Connection.New;

            _request = "DELETE USERS WHERE id = @Id";

            _command = new(_request, _connection);

            _command.Parameters.Add(new SqlParameter("@Id", Id));

            _connection.Open();

            int nbLignes = _command.ExecuteNonQuery();

            _command.Dispose();

            _connection.Close();

            return nbLignes > 0;
        }
    }
}
