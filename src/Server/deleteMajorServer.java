package Server;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.codehaus.jackson.map.ObjectMapper;

import Major.MajorConnection;

public class deleteMajorServer extends HttpServlet{
	public void service(HttpServletRequest request,HttpServletResponse response)
	throws ServletException,IOException{
		response.setCharacterEncoding("UTF-8");
		String name = request.getParameter("name");
		System.out.print(name);
		MajorConnection s = new MajorConnection();
		int flag = s.deleteMajor(name);
		System.out.print(flag);
		
		ObjectMapper om = new ObjectMapper();
		String json = om.writeValueAsString(flag);
		PrintWriter pw = response.getWriter();
		pw.print(json);
	}
}
