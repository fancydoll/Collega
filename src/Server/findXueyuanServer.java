package Server;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.codehaus.jackson.map.ObjectMapper;

import Major.MajorConnection;

public class findXueyuanServer extends HttpServlet{
	public void service(HttpServletRequest request,HttpServletResponse response)
	throws ServletException,IOException{
		response.setCharacterEncoding("UTF-8");
		MajorConnection x = new MajorConnection();
		List list = x.findXueyuan();
		
		ObjectMapper om = new ObjectMapper();
		String json = om.writeValueAsString(list);
		PrintWriter pw = response.getWriter();
		pw.print(json);
	}
}
