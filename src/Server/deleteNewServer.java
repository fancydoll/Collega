package Server;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.codehaus.jackson.map.ObjectMapper;

import News.newsConnection;

public class deleteNewServer extends HttpServlet{
	public void service(HttpServletRequest request,HttpServletResponse response)
	throws ServletException,IOException{
		response.setCharacterEncoding("UTF-8");
		int id = Integer.parseInt(request.getParameter("id"));
		newsConnection td = new newsConnection();
		int flag = td.deleteNews(id);
		
		ObjectMapper om = new ObjectMapper();
		String json = om.writeValueAsString(flag);
		PrintWriter pw = response.getWriter();
		pw.print(json);
	}
}
