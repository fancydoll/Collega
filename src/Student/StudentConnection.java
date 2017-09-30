package Student;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import Connection.*;
public class StudentConnection {
	java.sql.Connection conn = null;
	PreparedStatement qs = null;
	ResultSet rs = null;
	public int setStudent(String name,String sex,int age,String School,
	String address,String tell,String course,String beizhu){
		int flag = 0;
		try {
			conn=Connection.connect();
			qs = conn.prepareStatement("select name from student where name = ?");
			qs.setString(1, name);
			rs = qs.executeQuery();
			if(rs.next()){
//				System.out.print(flag);
				return flag;
			}
			else{
				qs = conn.prepareStatement("insert into student values(?,?,?,?,?,?,?,?)");
				qs.setString(1,name);
				qs.setString(2, sex);
				qs.setInt(3, age);
				qs.setString(4, School);
				qs.setString(5, address);
				qs.setString(6, tell);
				qs.setString(7, course);
				qs.setString(8, beizhu);
				flag = qs.executeUpdate();
//				System.out.print(flag);
				return flag;
			}
		}
		catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return flag;
		}
		
	}
	
//	查询学生信息
	public List findStudent(int index,int count){
		try {
			conn=Connection.connect();
			qs = conn.prepareStatement("select * from student limit ?,?");
			qs.setInt(1, index);
			qs.setInt(2, count);
			rs = qs.executeQuery();
			List list = new ArrayList();
			while(rs.next()){
				Student s1 = new Student();
				s1.setName(rs.getString(1));
				s1.setSex(rs.getString(2));
				s1.setAge(rs.getInt(3));
				s1.setSchool(rs.getString(4));
				s1.setAddress(rs.getString(5));
				s1.setTell(rs.getString(6));
				s1.setCourse(rs.getString(7));
				s1.setBeizhu(rs.getString(8));
				list.add(s1);
			}
			return list;
		}
		catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return null;
		}	
	}
	
//	删除学生信息
	public int deleteStudent(String name){
		int flag = 0;
		conn = Connection.connect();
		try {
			qs = conn.prepareStatement("delete from student where name = ?");
			qs.setString(1,name);
			flag = qs.executeUpdate();
			return flag;
		} catch (SQLException e) {
			e.printStackTrace();
			return flag;
		}
	}
}
