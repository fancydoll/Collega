package News;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import Connection.*;
public class newsConnection {
	java.sql.Connection conn = null;
	PreparedStatement qs = null;
	ResultSet rs = null;
	
	public int setNews(String type,String title){
		int flag = 0;
		int typeid = 0;
		try {
			conn=Connection.connect();
			qs = conn.prepareStatement("select typeid from newsType where type = ?");
			qs.setString(1, type);
			rs = qs.executeQuery();
			if(rs.next()){
				typeid = rs.getInt(1);
			}
			qs = conn.prepareStatement("insert into news(title,typeid) VALUES (?,?)");
			qs.setString(1, title);
			qs.setInt(2, typeid);
			flag = qs.executeUpdate();
			return flag;
			
		}
		catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return flag;
		}	
	}
	
//	获得热点新闻
	public List getHotNews(int typeid,int index,int count){
		conn = Connection.connect();
		try {
			qs = conn.prepareStatement("select * from news where typeid=? limit ?,?");
			qs.setInt(1,typeid);
			qs.setInt(2,index);
			qs.setInt(3,count);
			rs = qs.executeQuery();
			List list = new ArrayList();
			while(rs.next()){
				news n1 = new news();
				n1.setId(rs.getInt(1));
				n1.setTitle(rs.getString(2));
				n1.setTypeid(rs.getInt(3));
				list.add(n1);
			}
			return list;
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return null;
		}
	}
	
	//删除热点新闻
	public int deleteNews(int id){
		int flag = 0;
		conn = Connection.connect();
		try {
			qs = conn.prepareStatement("delete from news where id = ?");
			qs.setInt(1,id);
			flag = qs.executeUpdate();
			return flag;
		} catch (SQLException e) {
			e.printStackTrace();
			return flag;
		}
	}
}

