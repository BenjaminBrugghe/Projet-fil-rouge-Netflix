using Back_end_netflix.Tools;
using DocumentFormat.OpenXml.Bibliography;
using System.Data.SqlClient;

namespace Back_end_netflix.Models
{
    public class Movies
    {
        #region Attributs

        private int id;
        private string title;
        private string description;
        private string director;
        private string category;
        private string imageUrl;
        private string videoUrl;

        static string _request;
        static SqlCommand _command;
        static SqlConnection _connection;
        static SqlDataReader _reader;

        #endregion

        #region constructors

        public Movies()
        {

        }

        public Movies(string title, string description, string director, string category, string imageUrl, string videoUrl)
        {
            Title = title;
            Description = description;  
            Director = director;
            Category = category;
            ImageUrl = imageUrl;
            VideoUrl = videoUrl;
        }
        #endregion

        #region Propriétés

        public int Id { get => id; set => id = value; }
        public string Title { get => title; set => title = value; }
        public string Description { get => description; set => description = value; }
        public string Director { get => director; set => director = value; }
        public string Category { get => category; set => category = value; }
        public string ImageUrl { get => imageUrl; set => imageUrl = value; }
        public string VideoUrl { get => videoUrl; set => videoUrl = value; }

        #endregion

        public static List<Movies> GetAllMovies()
        {
            List<Movies> movieList = new List<Movies>();

            SqlConnection connection = Connection.New;

            string request = "SELECT * FROM MOVIES";

            SqlCommand command = new SqlCommand(request, connection);

            connection.Open();

            SqlDataReader reader = command.ExecuteReader();

            while (reader.Read())
            {
                Movies movie = new Movies()
                {
                    Id = reader.GetInt32(0),
                    Title = reader.GetString(1),
                    Description = reader.GetString(2),
                    Director = reader.GetString(3),
                    Category = reader.GetString(4),
                    ImageUrl = reader.GetString(5),
                    VideoUrl = reader.GetString(6)
                };
                movieList.Add(movie);
            }
            reader.Close();

            command.Dispose();

            connection.Close();

            return movieList;
        }

        public int AddMovie()
        {
            _connection = Connection.New;

            _request = "INSERT INTO MOVIES (title, description, director, category, imageUrl, videoUrl) " +
                "OUTPUT INSERTED.ID VALUES (@title , @description , @director , @category , @imageUrl , @videoUrl )";

            _command = new SqlCommand(_request, _connection);

            _command.Parameters.Add(new SqlParameter("@title", Title));
            _command.Parameters.Add(new SqlParameter("@description", Description));
            _command.Parameters.Add(new SqlParameter("@director", Director));
            _command.Parameters.Add(new SqlParameter("@category", Category));
            _command.Parameters.Add(new SqlParameter("@imageUrl", ImageUrl));
            _command.Parameters.Add(new SqlParameter("@videoUrl", VideoUrl));

            _connection.Open();

            int newUser = (int)_command.ExecuteScalar();

            _command.Dispose();

            _connection.Close();

            return newUser;
        }

        public bool EditMovie()
        {
            _connection = Connection.New;

            _request = "UPDATE MOVIES SET title = @title, description = @description, director = @director, category = @category, imageUrl = @imageUrl, videoUrl = @videoUrl WHERE id = @Id";

            _command = new SqlCommand(_request, _connection);

            _command.Parameters.Add(new SqlParameter("@id", Id));
            _command.Parameters.Add(new SqlParameter("@title", Title));
            _command.Parameters.Add(new SqlParameter("@description", Description));
            _command.Parameters.Add(new SqlParameter("@director", Director));
            _command.Parameters.Add(new SqlParameter("@category", Category));
            _command.Parameters.Add(new SqlParameter("@imageUrl", ImageUrl));
            _command.Parameters.Add(new SqlParameter("@videoUrl", VideoUrl));

            _connection.Open();

            int nbLignes = _command.ExecuteNonQuery();

            _command.Dispose();

            _connection.Close();

            return nbLignes > 0;
        }

        public bool DeleteMovie()
        {
            _connection = Connection.New;

            _request = "DELETE MOVIES WHERE id = @Id";

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
