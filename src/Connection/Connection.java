package Connection;

import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;

import com.mysql.jdbc.PreparedStatement;

public class Connection {
	public static java.sql.Connection connect(){
		java.sql.Connection conn = null;
		PreparedStatement qs = null;
		ResultSet rs = null;
		try {
			Class.forName("com.mysql.jdbc.Driver");
		} catch (ClassNotFoundException e) {
			e.printStackTrace();
		}
		try {
			return conn = DriverManager.getConnection("jdbc:mysql://localhost:3306/collega","root","961015");
		} catch (SQLException e) {
			e.printStackTrace();
			return null;
		}
	}
}
