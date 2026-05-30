package readtrade.middleware;

import jakarta.servlet.*;
import jakarta.servlet.annotation.WebFilter;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;

import java.io.IOException;

@WebFilter("/admin/*")
public class AdminFilter implements Filter {

    @Override
    public void doFilter(ServletRequest servletRequest,
                         ServletResponse servletResponse,
                         FilterChain chain) throws IOException, ServletException {

        HttpServletRequest request = (HttpServletRequest) servletRequest;
        HttpServletResponse response = (HttpServletResponse) servletResponse;

        String requestURI = request.getRequestURI();

        // Allow static resources without session check
        if (requestURI.contains("adminlog.html") ||
                requestURI.contains(".css") ||
                requestURI.contains(".js") ||
                requestURI.contains(".png") ||
                requestURI.contains(".jpg") ||
                requestURI.contains(".ico")) {
            chain.doFilter(request, response);
            return;
        }

        // Check admin session
        HttpSession session = request.getSession(false);
        boolean isAdmin = session != null && session.getAttribute("admin") != null;

        if (!isAdmin) {
            // If API request return 401, else redirect to login
            if (requestURI.contains("/api/")) {
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                response.getWriter().write("{\"status\":false,\"message\":\"Unauthorized\"}");
            } else {
                response.sendRedirect(request.getContextPath() + "/adminlog.html");
            }
            return;
        }

        chain.doFilter(request, response);
    }

    @Override
    public void init(FilterConfig filterConfig) {}

    @Override
    public void destroy() {}
}