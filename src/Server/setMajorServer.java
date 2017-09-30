package Server;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.codehaus.jackson.map.ObjectMapper;

import Major.MajorConnection;

public class setMajorServer extends HttpServlet{
	public void service(HttpServletRequest request,HttpServletResponse response)
	throws ServletException,IOException{
		response.setCharacterEncoding("UTF-8");
		MajorConnection m1 = new MajorConnection();
		String name = request.getParameter("name");
		String img = request.getParameter("img");
		String desc = request.getParameter("desc");
		String xname = request.getParameter("xname");
//		System.out.print(name);
//		System.out.print(sex);
//		System.out.print(age);
//		System.out.print(School);
//		System.out.print(address);
//		System.out.print(tell);
//		System.out.print(course);
//		System.out.print(beizhu);
		
		int flag = m1.setMajor(name, img, desc, xname);
		
		ObjectMapper om = new ObjectMapper();
		String json = om.writeValueAsString(flag);
		PrintWriter pw = response.getWriter();
		pw.print(json);
		
//		int flag = m1.setMajor("java", "img/9.jpg", "java专业", "计算机学院");
//		System.out.print(flag);
	}
}
