package Server;

import java.io.IOException;
import java.io.PrintWriter;

import Student.*;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.codehaus.jackson.map.ObjectMapper;

public class webServer extends HttpServlet{
	public void service(HttpServletRequest request,HttpServletResponse response)
	throws ServletException,IOException{
		response.setCharacterEncoding("UTF-8");
		StudentConnection s1 = new StudentConnection();
		String name = request.getParameter("name");
		String sex = request.getParameter("sex");
		int age = Integer.parseInt(request.getParameter("age"));
		String School = request.getParameter("School");
		String address = request.getParameter("address");
		String tell = request.getParameter("tell");
		String course = request.getParameter("course");
		String beizhu = request.getParameter("beizhu");
//		System.out.print(name);
//		System.out.print(sex);
//		System.out.print(age);
//		System.out.print(School);
//		System.out.print(address);
//		System.out.print(tell);
//		System.out.print(course);
//		System.out.print(beizhu);
		int flag = s1.setStudent(name, sex, age, School, address, tell, course, beizhu);
		ObjectMapper om = new ObjectMapper();
		String json = om.writeValueAsString(flag);
		PrintWriter pw = response.getWriter();
		pw.print(json);
//		System.out.print(flag);
//		int flag = s1.setStudent("李四", "男", 16, "一中", "湖南", "15116017564", "java", "无");
	}
}
