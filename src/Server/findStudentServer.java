package Server;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.codehaus.jackson.map.ObjectMapper;

import Student.StudentConnection;

public class findStudentServer extends HttpServlet{
	public void service(HttpServletRequest request,HttpServletResponse response)
	throws ServletException,IOException{
		response.setCharacterEncoding("UTF-8");
		int page = Integer.parseInt(request.getParameter("ipage"));
		StudentConnection s = new StudentConnection();
		List list = s.findStudent((page-1)*5,5);
		
		ObjectMapper om = new ObjectMapper();
		String json = om.writeValueAsString(list);
		PrintWriter pw = response.getWriter();
		pw.print(json);
	}
}
