package Major;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import Connection.Connection;
import News.news;

public class MajorConnection {
	java.sql.Connection conn = null;
	PreparedStatement qs = null;
	ResultSet rs = null;
	public int setMajor(String name,String img,String desc,String xname){
		int xid = 0;
		int flag = 0;
		try {
			conn=Connection.connect();
			qs = conn.prepareStatement("select id from xueyuan where xname = ?");
			qs.setString(1, xname);
			rs = qs.executeQuery();
			if(rs.next()){
				xid = rs.getInt(1);
			}
			if(xid != 0){
				qs = conn.prepareStatement("insert into major(`name`,`img`,`desc`,`xid`) values(?,?,?,?)");
				qs.setString(1,name);
				qs.setString(2, img);
				qs.setString(3, desc);
				qs.setInt(4, xid);
				flag = qs.executeUpdate();
			}
			return flag;
		}
		catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return flag;
		}
	}
	
//	查询学院
	public List findXueyuan(){
		conn = Connection.connect();
		try {
			qs = conn.prepareStatement("select * from xueyuan");
			rs = qs.executeQuery();
			List list = new ArrayList();
			while(rs.next()){
				xueyuan x1 = new xueyuan();
				x1.setId(rs.getInt(1));
				x1.setXname(rs.getString(2));
				list.add(x1);
			}
			return list;
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return null;
		}
	}
	
//	删除专业
	public int deleteMajor(String name){
		int flag = 0;
		System.out.print(name);
		conn = Connection.connect();
		try {
			qs = conn.prepareStatement("delete from major where name = ?");
			qs.setString(1,name);
			flag = qs.executeUpdate();
			return flag;
		} catch (SQLException e) {
			e.printStackTrace();
			return flag;
		}
	}
	
//	查询专业
	public List getMajor(int index,int count){
		conn = Connection.connect();
		try {
			qs = conn.prepareStatement("select * from major limit ?,?");
			qs.setInt(1,index);
			qs.setInt(2,count);
			rs = qs.executeQuery();
			List list = new ArrayList();
			while(rs.next()){
				major m1 = new major();
				m1.setName(rs.getString(2));
				m1.setDesc(rs.getString(4));
				list.add(m1);
			}
			return list;
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return null;
		}
	}
	
//	查询不同学院的不同专业
	public List findMajor(int xid,int index,int count){
		conn = Connection.connect();
		try {
			qs = conn.prepareStatement("select * from major where xid= ? limit ?,?");
			qs.setInt(1,xid);
			qs.setInt(2,index);
			qs.setInt(3,count);
			rs = qs.executeQuery();
			List list = new ArrayList();
			while(rs.next()){
				major m1 = new major();
				m1.setId(rs.getInt(1));
				m1.setName(rs.getString(2));
				m1.setImg(rs.getString(3));
				m1.setDesc(rs.getString(4));
				m1.setXid(rs.getInt(5));
				list.add(m1);
			}
			return list;
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return null;
		}
	}
}
