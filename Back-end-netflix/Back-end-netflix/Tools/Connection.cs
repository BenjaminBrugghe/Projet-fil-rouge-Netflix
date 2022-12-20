using System.Data.SqlClient;

namespace Back_end_netflix.Tools
{
    internal class Connection
    {
        private static string connectionString = @"Data Source=(localDB)\NetflixV2;Integrated Security=True";

        public static SqlConnection New { get => new SqlConnection(connectionString); }
    }
}
