package Server;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.codehaus.jackson.map.ObjectMapper;

import News.newsConnection;

public class newsServer extends HttpServlet{
	public void service(HttpServletRequest request,HttpServletResponse response)
			throws ServletException,IOException{
				response.setCharacterEncoding("UTF-8");
				String title = request.getParameter("title");
				String type = request.getParameter("type");
				newsConnection n1 = new newsConnection();
				int flag = n1.setNews(type,title);
				
				ObjectMapper om = new ObjectMapper();
				String json = om.writeValueAsString(flag);
				PrintWriter pw = response.getWriter();
				pw.print(json);
			}

}
